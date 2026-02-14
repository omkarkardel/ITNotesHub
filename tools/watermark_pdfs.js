// Batch watermark PDFs in a directory tree.
// Usage: node tools/watermark_pdfs.js --dir files --text ITNotesHub

const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const { PDFDocument, rgb, degrees, StandardFonts } = require('pdf-lib');

function getArg(name, fallback) {
  const idx = process.argv.indexOf(name);
  if (idx !== -1 && process.argv[idx + 1]) return process.argv[idx + 1];
  return fallback;
}

async function* walk(dir) {
  for (const entry of await fsp.readdir(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else {
      yield fullPath;
    }
  }
}

async function watermarkPdfFile(filePath, text) {
  const input = await fsp.readFile(filePath);
  const pdfDoc = await PDFDocument.load(input);
  const pages = pdfDoc.getPages();
  if (!pages.length) return false;

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
  await fsp.writeFile(filePath, Buffer.from(bytes));
  return true;
}

async function main() {
  const targetDir = getArg('--dir', 'files');
  const text = getArg('--text', 'ITNotesHub');
  const absDir = path.resolve(process.cwd(), targetDir);
  if (!fs.existsSync(absDir)) {
    console.error('Directory not found:', absDir);
    process.exit(1);
  }

  let count = 0;
  for await (const filePath of walk(absDir)) {
    if (!filePath.toLowerCase().endsWith('.pdf')) continue;
    await watermarkPdfFile(filePath, text);
    count++;
    console.log('Watermarked:', filePath);
  }
  console.log('Done. PDFs updated:', count);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
