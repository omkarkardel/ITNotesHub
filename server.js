// Local upload server to write files into ./files and rebuild manifest
// Usage: node server.js

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

    for (const f of req.files){
      const destName = makeDestName(label, type, f.originalname);
      const abs = path.join(dir, destName);
      await writeBufferToFile(abs, f.buffer);
    }

    const ok = await rebuildManifest();
    return res.json({ ok, saved: req.files.length });
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

app.listen(PORT, () => {
  console.log(`Upload server running on http://localhost:${PORT}`);
});
