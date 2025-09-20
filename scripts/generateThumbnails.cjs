// scripts/generateThumbnails.cjs
// Node.js script to generate thumbnails for all images in public/assets/images/gallery/media
// Requires sharp: npm install sharp

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const exts = ['.jpg', '.jpeg', '.png', '.webp'];
const mediaDir = path.join(__dirname, '../public/assets/images/gallery/media');
const thumbDir = path.join(__dirname, '../public/assets/images/gallery/thumbnails');

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

function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const files = walk(mediaDir).filter(f => exts.includes(path.extname(f).toLowerCase()));

files.forEach(srcPath => {
  const rel = path.relative(mediaDir, srcPath);
  const destPath = path.join(thumbDir, rel);
  ensureDirSync(path.dirname(destPath));
  sharp(srcPath)
    .resize(40, 40, { fit: 'inside' })
    .blur(2)
    .toFile(destPath)
    .then(() => console.log('Thumbnail created:', destPath))
    .catch(err => console.error('Error creating thumbnail:', destPath, err));
});

console.log('Thumbnail generation started for', files.length, 'images.');
