// Local upload server to write files into ./files and rebuild manifest
// Usage: node server.js

require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const { spawn } = require('child_process');
const { PDFDocument, rgb, degrees, StandardFonts } = require('pdf-lib');

const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 200 * 1024 * 1024 } });
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const ROOT = process.cwd();
const FILES_DIR = path.join(ROOT, 'files');
const PRICING_FILE = path.join(ROOT, 'pricing-meta.json');

app.use(express.static(ROOT, {
  etag: true,
  lastModified: true,
  maxAge: '1h',
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.html' || ext === '.json') {
      res.setHeader('Cache-Control', 'no-cache');
      return;
    }
    if (['.css', '.js', '.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.woff', '.woff2'].includes(ext)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      return;
    }
    if (ext === '.pdf') {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
  }
})); // Serve static files (HTML, CSS, JS, etc.)

// Helper function to walk directory recursively
async function* walk(dir) {
  for (const entry of await fs.promises.readdir(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else {
      yield fullPath;
    }
  }
}

function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function watermarkPdfBuffer(buffer, text) {
  const pdfDoc = await PDFDocument.load(buffer);
  const pages = pdfDoc.getPages();
  if (!pages.length) return buffer;

  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  pages.forEach((page) => {
    const { width, height } = page.getSize();
    const fontSize = Math.max(28, Math.floor(Math.min(width, height) / 8));
    page.drawText(text, {
      x: width * 0.12,
      y: height * 0.5,
      size: fontSize,
      font,
      color: rgb(0.35, 0.35, 0.35),
      rotate: degrees(-25),
      opacity: 0.18
    });
  });

  const bytes = await pdfDoc.save();
  return Buffer.from(bytes);
}

function isPdfUpload(file) {
  if (!file) return false;
  if (file.mimetype === 'application/pdf') return true;
  const name = (file.originalname || '').toLowerCase();
  return name.endsWith('.pdf');
}

function isPdfPath(filePath) {
  return (filePath || '').toLowerCase().endsWith('.pdf');
}

function hasUnitTypePrefix(fileName, type) {
  const base = path.parse(fileName).name;
  if (type === 'handwritten') {
    return /^\s*hand[a-z]*\s*notes?\b/i.test(base);
  }
  if (type === 'imp') {
    return /^\s*(?:imp(?:ortant)?\s*questions?)\b/i.test(base);
  }
  return false;
}

function makeDestName(label, type, originalName){
  let prefix = '';
  if (label.includes('Que Paper Solution')) prefix = 'Que Paper Solution - ';
  else if (label.includes('Que Paper')) prefix = 'Que Paper - ';
  else if (label.startsWith('Unit')){
    const unitType = type === 'handwritten' ? 'handwritten' : 'imp';
    if (hasUnitTypePrefix(originalName, unitType)) return originalName;
    prefix = (unitType === 'handwritten' ? 'Handwritten Notes - ' : 'IMP Questions - ');
  }
  const lower = originalName.toLowerCase();
  if (lower.includes(prefix.trim().toLowerCase())) return originalName;
  return prefix + originalName;
}

function computeTargetParts(subject, exam, label){
  const parts = ['files', subject, exam];
  if (label.includes('Que Paper Solution')) {
    parts.push('Solution');
  } else if (label.startsWith('Unit')) {
    parts.push(label.replace(' ', ''));
  }
  return parts;
}

async function writeBufferToFile(absPath, buffer){
  await fsp.writeFile(absPath, buffer);
}

function rebuildManifest(){
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [path.join('tools', 'build_resources_manifest.js')], { cwd: ROOT, stdio: 'inherit' });
    child.on('exit', (code) => resolve(code === 0));
  });
}

async function readPricingMeta() {
  try {
    const raw = await fsp.readFile(PRICING_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

async function writePricingMeta(meta) {
  await fsp.writeFile(PRICING_FILE, JSON.stringify(meta, null, 2), 'utf8');
}

app.post('/upload', upload.array('files'), async (req, res) => {
  try {
    const { subject, exam, label, type } = req.body;
    if (!subject || !exam || !label) return res.status(400).json({ ok:false, error:'Missing subject/exam/label' });
    if (!req.files || req.files.length === 0) return res.status(400).json({ ok:false, error:'No files' });

    const parts = computeTargetParts(subject, exam, label);
    const dir = path.join(ROOT, ...parts);
    ensureDirSync(dir);

    const pricingMeta = await readPricingMeta();
    const savedFiles = [];
    for (const f of req.files){
      const destName = makeDestName(label, type, f.originalname);
      const abs = path.join(dir, destName);
      await writeBufferToFile(abs, f.buffer);
      const relPath = path.join(...parts, destName).split(path.sep).join('/');
      pricingMeta[relPath] = {
        accessType: 'Free',
        priceInr: null,
        formUrl: null,
        updatedAt: new Date().toISOString()
      };
      savedFiles.push({
        subject, exam, label, type: type || null,
        filename: destName, path: relPath,
        size: f.size || (f.buffer ? f.buffer.length : null),
        mimetype: f.mimetype || null,
        uploadedAt: new Date()
      });
    }
    await writePricingMeta(pricingMeta);

    const ok = await rebuildManifest();
    return res.json({ ok, saved: req.files.length, savedFiles });
  } catch (e){
    console.error(e);
    return res.status(500).json({ ok:false, error: e.message });
  }
});

app.post('/build', async (_req, res) => {
  try {
    const ok = await rebuildManifest();
    res.json({ ok });
  } catch (e){
    res.status(500).json({ ok:false, error:e.message });
  }
});

// Delete a single file by its URL path as shown in resources.json
// Body: { url: "files/Subject/Exam/.../filename.ext" }
app.post('/delete', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ ok:false, error:'Missing url' });
    // Normalize and build absolute path
    const safeRel = url.replace(/\\/g,'/').replace(/^[/.]+/, '');
    const abs = path.join(ROOT, safeRel.split('/').join(path.sep));
    if (!abs.startsWith(FILES_DIR)) {
      return res.status(400).json({ ok:false, error:'Invalid path' });
    }
    if (!fs.existsSync(abs)) {
      return res.status(404).json({ ok:false, error:'File not found' });
    }
    await fsp.unlink(abs);
    const pricingMeta = await readPricingMeta();
    if (pricingMeta[safeRel]) {
      delete pricingMeta[safeRel];
      await writePricingMeta(pricingMeta);
    }

    const ok = await rebuildManifest();
    return res.json({ ok, deleted: url });
  } catch (e){
    console.error(e);
    return res.status(500).json({ ok:false, error:e.message });
  }
});

// Watermarked download endpoint: /download?url=files/Subject/Exam/.../file.pdf
app.get('/download', async (req, res) => {
  try {
    const url = (req.query.url || '').toString();
    if (!url) return res.status(400).send('Missing url');
    const safeRel = url.replace(/\\/g, '/').replace(/^[/.]+/, '');
    const abs = path.join(ROOT, safeRel.split('/').join(path.sep));
    if (!abs.startsWith(FILES_DIR)) {
      return res.status(400).send('Invalid path');
    }
    if (!fs.existsSync(abs)) {
      return res.status(404).send('File not found');
    }

    const filename = path.basename(abs);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    if (isPdfPath(abs)) {
      const input = await fsp.readFile(abs);
      const out = await watermarkPdfBuffer(input, 'ITNotesHub');
      res.setHeader('Content-Type', 'application/pdf');
      return res.send(out);
    }

    return res.sendFile(abs);
  } catch (e) {
    console.error(e);
    return res.status(500).send('Download error');
  }
});

// List files endpoint (similar to netlify function)
app.get('/list-files', async (req, res) => {
  try {
    const files = [];
    for await (const filePath of walk(FILES_DIR)) {
      const relPath = path.relative(FILES_DIR, filePath).split(path.sep).join('/');
      const stat = await fs.promises.stat(filePath);
      files.push({
        id: relPath, // Use relPath as id for local
        filename: relPath,
        length: stat.size,
        contentType: require('mime-types').lookup(filePath) || 'application/pdf',
        uploadDate: stat.mtime.toISOString(),
        url: `/files/${relPath}` // Local URL
      });
    }
    res.json(files);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// ...existing code...

app.listen(PORT, () => {
  console.log(`Upload server running on http://localhost:${PORT}`);
});
