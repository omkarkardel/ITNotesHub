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

const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 200 * 1024 * 1024 } });
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const ROOT = process.cwd();
const FILES_DIR = path.join(ROOT, 'files');

app.use(express.static(ROOT)); // Serve static files (HTML, CSS, JS, etc.)

function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function makeDestName(label, type, originalName){
  let prefix = '';
  if (label.includes('Que Paper')) prefix = label + ' - ';
  else if (label.startsWith('Unit')){
    prefix = (type === 'handwritten' ? 'Handwritten Notes - ' : 'IMP Questions - ');
  }
  const lower = originalName.toLowerCase();
  if (lower.includes(prefix.trim().toLowerCase())) return originalName;
  return prefix + originalName;
}

function computeTargetParts(subject, exam, label){
  const parts = ['files', subject, exam];
  if (label.startsWith('Unit')) parts.push(label.replace(' ', ''));
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

app.post('/upload', upload.array('files'), async (req, res) => {
  try {
    const { subject, exam, label, type } = req.body;
    if (!subject || !exam || !label) return res.status(400).json({ ok:false, error:'Missing subject/exam/label' });
    if (!req.files || req.files.length === 0) return res.status(400).json({ ok:false, error:'No files' });

    const parts = computeTargetParts(subject, exam, label);
    const dir = path.join(ROOT, ...parts);
    ensureDirSync(dir);


    const savedFiles = [];
    for (const f of req.files){
      const destName = makeDestName(label, type, f.originalname);
      const abs = path.join(dir, destName);
      await writeBufferToFile(abs, f.buffer);
      const relPath = path.join(...parts, destName).split(path.sep).join('/');
      savedFiles.push({
        subject, exam, label, type: type || null,
        filename: destName, path: relPath,
        size: f.size || (f.buffer ? f.buffer.length : null),
        mimetype: f.mimetype || null,
        uploadedAt: new Date()
      });
    }

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

    // ...existing code...
    const ok = await rebuildManifest();
    return res.json({ ok, deleted: url });
  } catch (e){
    console.error(e);
    return res.status(500).json({ ok:false, error:e.message });
  }
});

// ...existing code...

app.listen(PORT, () => {
  console.log(`Upload server running on http://localhost:${PORT}`);
});
