// scripts/generateGalleryItems.cjs
// Node.js script to generate a galleryItems array from all images (and optionally videos)
// in public/assets/images/gallery/media
// Usage: node scripts/generateGalleryItems.cjs [--includeVideos]

const fs = require('fs');
const path = require('path');

const exts = {
  image: ['.jpg', '.jpeg', '.png', '.webp'],
  video: ['.mp4']
};

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

const allowedExts = includeVideos ? Object.values(exts).flat() : exts.image;
const galleryItems = files
    .filter(f => allowedExts.includes(path.extname(f).toLowerCase()))
    .map(f => {
      const ext = path.extname(f).toLowerCase();
      // Hardcode the type property as a string literal for TS
      const type = exts.image.includes(ext) ? "'image'" : "'video'";
      // Convert to web path
      const webPath = f.replace(/.*public/, '').replace(/\\/g, '/');
      return `{ type: ${type}, src: '${webPath}', alt: 'Gallery ${type === "'image'" ? 'Image' : 'Video'}' }`;
    });

const output = `// AUTO-GENERATED FILE. DO NOT EDIT MANUALLY\n// import type { GalleryItem } from '../components/Gallery';\nexport const galleryItems = [\n  ${galleryItems.join(',\n  ')}\n];\n`;

fs.writeFileSync(path.join(__dirname, '../src/data/galleryItems.ts'), output);
console.log('galleryItems.ts generated with', galleryItems.length, 'items.', includeVideos ? '(including videos)' : '(images only)');
