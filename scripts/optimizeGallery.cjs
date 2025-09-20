// scripts/optimizeGallery.cjs
// Optimize gallery images by converting to WebP and resizing to a sane max width.
// Usage: node scripts/optimizeGallery.cjs [--maxWidth=1600] [--quality=72] [--keepOriginal]

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const mediaDir = path.join(__dirname, '../public/assets/images/gallery/media');
const exts = ['.jpg', '.jpeg', '.png'];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else {
      results.push(filePath);
    }
  });
  return results;
}

function parseArgs() {
  const args = process.argv.slice(2);
  const out = { maxWidth: 1600, quality: 72, keepOriginal: false };
  for (const a of args) {
    if (a.startsWith('--maxWidth=')) out.maxWidth = parseInt(a.split('=')[1], 10) || out.maxWidth;
    if (a.startsWith('--quality=')) out.quality = parseInt(a.split('=')[1], 10) || out.quality;
    if (a === '--keepOriginal') out.keepOriginal = true;
  }
  return out;
}

async function optimizeOne(srcPath, { maxWidth, quality, keepOriginal }) {
  const ext = path.extname(srcPath).toLowerCase();
  if (!exts.includes(ext)) return { skipped: true };
  const dir = path.dirname(srcPath);
  const base = path.basename(srcPath, ext);
  const outPath = path.join(dir, `${base}.webp`);
  try {
    await sharp(srcPath)
      .rotate()
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality })
      .toFile(outPath);
    if (!keepOriginal) {
      fs.unlinkSync(srcPath);
    }
    return { outPath };
  } catch (err) {
    console.error('Optimize failed:', srcPath, err.message);
    return { error: err };
  }
}

async function main() {
  const opts = parseArgs();
  const files = walk(mediaDir).filter(f => exts.includes(path.extname(f).toLowerCase()));
  console.log(`Optimizing ${files.length} images -> WebP (maxWidth=${opts.maxWidth}, quality=${opts.quality})`);
  let ok = 0, fail = 0;
  for (const f of files) {
    const res = await optimizeOne(f, opts);
    if (res && res.outPath) { ok++; console.log('✓', res.outPath); } else if (res && res.skipped) { /* noop */ } else { fail++; }
  }
  console.log(`Done. Success: ${ok}, Failed: ${fail}`);
}

main().catch(err => { console.error(err); process.exit(1); });
