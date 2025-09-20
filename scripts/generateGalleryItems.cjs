// scripts/generateGalleryItems.cjs
// Node.js script to generate a galleryItems array from all images (and optionally videos)
// in public/assets/images/gallery/media
// Usage: node scripts/generateGalleryItems.cjs [--includeVideos]

const fs = require('fs');
const path = require('path');

// Images only; videos are intentionally excluded from the gallery
const imageExts = ['.webp', '.jpg', '.jpeg', '.png'];

const mediaDir = path.join(__dirname, '../public/assets/images/gallery/media');

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
  return {
    includeVideos: args.includes('--includeVideos')
  };
}

const { includeVideos } = parseArgs();
const files = walk(mediaDir);

const galleryItems = files
  .filter(f => imageExts.includes(path.extname(f).toLowerCase()))
  .map(f => {
    // Convert to web path
    const webPath = f.replace(/.*public/, '').replace(/\\/g, '/');
    return `{ type: 'image', src: '${webPath}', alt: 'Gallery Image' }`;
  });

const output = `// AUTO-GENERATED FILE. DO NOT EDIT MANUALLY\n// import type { GalleryItem } from '../components/Gallery';\nexport const galleryItems = [\n  ${galleryItems.join(',\n  ')}\n];\n`;

fs.writeFileSync(path.join(__dirname, '../src/data/galleryItems.ts'), output);
console.log('galleryItems.ts generated with', galleryItems.length, 'image items.');
