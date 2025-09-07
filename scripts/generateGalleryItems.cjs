// scripts/generateGalleryItems.cjs
// Node.js script to generate a galleryItems array from all images and videos in public/assets/images/gallery/media

const fs = require('fs');
const path = require('path');

const exts = {
  image: ['.jpg', '.jpeg', '.png'],
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

const files = walk(mediaDir);

const galleryItems = files
  .filter(f => Object.values(exts).flat().includes(path.extname(f).toLowerCase()))
  .map(f => {
    const ext = path.extname(f).toLowerCase();
    // Use exact string literal types for 'type'
    const type = exts.image.includes(ext) ? 'image' : 'video';
    /** @type {'image' | 'video'} */
    const typeLiteral = type;
    // Convert to web path
    const webPath = f.replace(/.*public/, '').replace(/\\/g, '/');
    return `{ type: '${typeLiteral}', src: '${webPath}', alt: 'Gallery ${type.charAt(0).toUpperCase() + type.slice(1)}' }`;
  });

const output = `// AUTO-GENERATED FILE. DO NOT EDIT MANUALLY\nimport type { GalleryItem } from '../components/Gallery';\nexport const galleryItems: GalleryItem[] = [\n  ${galleryItems.join(',\n  ')}\n];\n`;

fs.writeFileSync(path.join(__dirname, '../src/data/galleryItems.ts'), output);
console.log('galleryItems.ts generated with', galleryItems.length, 'items.');
