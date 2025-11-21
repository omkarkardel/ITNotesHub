// Build resources.json by scanning the ./files directory
// Usage: node tools/build_resources_manifest.js
// Folder structure expected:
// ./files/<Subject>/Insem/
//   Insem Que Paper.* (multiple allowed)
//   Insem Que Paper Solution.* (multiple allowed)
//   Unit1/Handwritten Notes.* (multiple allowed)
//   Unit1/IMP Questions.* (multiple allowed)
//   Unit2/...
// ./files/<Subject>/Endsem/
//   Endsem Que Paper.* (multiple allowed)
//   Endsem Que Paper Solution.* (multiple allowed)
//   Unit3..Unit6 each with Handwritten Notes.* and IMP Questions.* (multiple allowed)

const fs = require('fs').promises;
const path = require('path');

const ROOT = process.cwd();
const FILES_DIR = path.join(ROOT, 'files');
const OUT_FILE = path.join(ROOT, 'resources.json');

const exts = ['.pdf', '.docx', '.pptx', '.ppt', '.xlsx', '.xls', '.txt', '.png', '.jpg', '.jpeg', '.zip'];

async function pathExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function listDirs(dir) {
  if (!(await pathExists(dir))) return [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries.filter(e => e.isDirectory()).map(e => e.name);
}

function matchByBaseNames(fileName, baseNames) {
  const lower = fileName.toLowerCase();
  const nameOnly = path.parse(lower).name;
  return baseNames.some(b => {
    const target = b.toLowerCase();
    return lower === target || nameOnly === target || nameOnly.startsWith(target);
  });
}

function stripPrefix(name, groupTitle) {
  const lowerName = name.toLowerCase();
  const lowerGroup = groupTitle.toLowerCase();
  if (lowerName.startsWith(lowerGroup)) {
    // remove group title and any leading separators/spaces/hyphen
    let remainder = name.slice(groupTitle.length).replace(/^\s*[-_:]+\s*/, '').trim();
    if (!remainder) return name; // fallback
    return remainder;
  }
  return name;
}

async function findAllFiles(dir, baseNames) {
  if (!(await pathExists(dir))) return [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = entries.filter(e => e.isFile()).map(e => e.name);
  const matched = [];
  for (const f of files) {
    if (matchByBaseNames(f, baseNames)) {
      matched.push(path.join(dir, f));
      continue;
    }
    // Also attempt exact base + known exts
    for (const base of baseNames) {
      for (const ext of exts) {
        if (f.toLowerCase() === (base + ext).toLowerCase()) {
          matched.push(path.join(dir, f));
        }
      }
    }
  }
  return matched;
}

async function findAllByGlobNames(dir, names) {
  // Simple name contains match (case-insensitive)
  if (!(await pathExists(dir))) return [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = entries.filter(e => e.isFile()).map(e => e.name);
  const targets = names.map(n => n.toLowerCase());
  const results = [];
  for (const f of files) {
    const fl = f.toLowerCase();
    if (targets.some(t => fl.includes(t))) results.push(path.join(dir, f));
  }
  return results;
}

async function fileMeta(absPath) {
  try {
    const stat = await fs.stat(absPath);
    return stat.mtime.toISOString();
  } catch { return null; }
}

async function buildUnitGroup(examDir, unitLabel) {
  // Support both 'Unit1' and 'Unit 1'
  const unitDirs = [unitLabel.replace(' ', ''), unitLabel];
  let unitPath = null;
  for (const u of unitDirs) {
    const p = path.join(examDir, u);
    if (await pathExists(p)) { unitPath = p; break; }
  }
  if (!unitPath) return null;

  const hnFiles = await findAllByGlobNames(unitPath, ['handwritten notes']);
  const impFiles = await findAllByGlobNames(unitPath, ['imp questions', 'important questions']);

  const items = [];
  for (const f of hnFiles) {
    items.push({ title: 'Handwritten Notes - ' + path.parse(f).name, url: toWebPath(f), mtime: await fileMeta(f) });
  }
  for (const f of impFiles) {
    items.push({ title: 'IMP Questions - ' + path.parse(f).name, url: toWebPath(f), mtime: await fileMeta(f) });
  }
  if (items.length === 0) return null;

  return { type: 'group', title: unitLabel, items };
}

function toWebPath(absPath) {
  return absPath.replace(ROOT + path.sep, '').split(path.sep).join('/');
}

async function buildSubject(subjectName) {
  const subjectDir = path.join(FILES_DIR, subjectName);
  const result = { name: subjectName, resources: { Insem: [], Endsem: [] } };

  for (const exam of ['Insem', 'Endsem']) {
    const examDir = path.join(subjectDir, exam);
    if (!(await pathExists(examDir))) continue;

    if (exam === 'Insem') {
      const qpFiles = await findAllByGlobNames(examDir, ['insem que paper', 'insem question paper']);
      const solFiles = await findAllByGlobNames(examDir, ['insem que paper solution', 'insem question paper solution']);
      if (qpFiles.length >= 1) {
        const qpItems = [];
        for (const f of qpFiles) {
          const base = path.parse(f).name;
          qpItems.push({ title: stripPrefix(base, 'Insem Que Paper'), url: toWebPath(f), mtime: await fileMeta(f) });
        }
        result.resources.Insem.push({ type: 'group', title: 'Insem Que Paper', items: qpItems });
      }
      if (solFiles.length >= 1) {
        const solItems = [];
        for (const f of solFiles) {
          const base = path.parse(f).name;
          solItems.push({ title: stripPrefix(base, 'Insem Que Paper Solution'), url: toWebPath(f), mtime: await fileMeta(f) });
        }
        result.resources.Insem.push({ type: 'group', title: 'Insem Que Paper Solution', items: solItems });
      }
      for (const u of ['Unit 1', 'Unit 2']) {
        const grp = await buildUnitGroup(examDir, u);
        if (grp) result.resources.Insem.push(grp);
      }
    } else {
      const qpFiles = await findAllByGlobNames(examDir, ['endsem que paper', 'endsem question paper']);
      const solFiles = await findAllByGlobNames(examDir, ['endsem que paper solution', 'endsem question paper solution']);
      const decodeFiles = await findAllByGlobNames(examDir, ['decode', 'book']);
      if (qpFiles.length >= 1) {
        const endQpItems = [];
        for (const f of qpFiles) {
          const base = path.parse(f).name;
          endQpItems.push({ title: stripPrefix(base, 'Endsem Que Paper'), url: toWebPath(f), mtime: await fileMeta(f) });
        }
        result.resources.Endsem.push({ type:'group', title:'Endsem Que Paper', items:endQpItems });
      }
      if (solFiles.length >= 1) {
        const endSolItems = [];
        for (const f of solFiles) {
          const base = path.parse(f).name;
          endSolItems.push({ title: stripPrefix(base, 'Endsem Que Paper Solution'), url: toWebPath(f), mtime: await fileMeta(f) });
        }
        result.resources.Endsem.push({ type:'group', title:'Endsem Que Paper Solution', items:endSolItems });
      }
      if (decodeFiles.length >= 1) {
        const decodeItems = [];
        for (const f of decodeFiles) {
          const base = path.parse(f).name;
          decodeItems.push({ title: stripPrefix(base, 'Decode/Book'), url: toWebPath(f), mtime: await fileMeta(f) });
        }
        result.resources.Endsem.push({ type:'group', title:'Decode/Book', items:decodeItems });
      }
      for (const u of ['Unit 3', 'Unit 4', 'Unit 5', 'Unit 6']) {
        const grp = await buildUnitGroup(examDir, u);
        if (grp) result.resources.Endsem.push(grp);
      }
    }
  }

  return result;
}

async function main() {
  if (!(await pathExists(FILES_DIR))) {
    console.error(`Missing folder: ${FILES_DIR}. Create it and place your files.`);
    process.exit(1);
  }
  const subjectNames = await listDirs(FILES_DIR);
  const results = [];
  for (const s of subjectNames) {
    results.push(await buildSubject(s));
  }
  const payload = { subjects: results };
  await fs.writeFile(OUT_FILE, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`Wrote manifest: ${OUT_FILE}`);
}

main().catch(err => { console.error(err); process.exit(1); });
