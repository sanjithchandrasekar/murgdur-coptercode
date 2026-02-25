import fs from 'fs';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const imagesDir = './client/public/images';
const productsFile = './client/src/data/products.js';

// Get all image files
function getAllImages(dir) {
  const results = {};
  
  function walk(currentPath, relPath = '') {
    const files = readdirSync(currentPath);
    for (const file of files) {
      const fullPath = join(currentPath, file);
      const stat = statSync(fullPath);
      const displayPath = relPath ? `${relPath}/${file}` : file;
      
      if (stat.isDirectory()) {
        walk(fullPath, displayPath);
      } else if (/\.(png|jpg|jpeg)$/i.test(file)) {
        const category = relPath || 'root';
        if (!results[category]) results[category] = [];
        results[category].push({
          path: `/images/${displayPath.replace(/\\/g, '/')}`,
          file: file
        });
      }
    }
  }
  
  walk(dir);
  return results;
}

// Get used images from products.js
function getUsedImages() {
  const content = fs.readFileSync(productsFile, 'utf8');
  const imageMatches = [...content.matchAll(/image:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  const imageMatches2 = [...content.matchAll(/img:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  return new Set([...imageMatches, ...imageMatches2]);
}

const allImages = getAllImages(imagesDir);
const usedImages = getUsedImages();

console.log(`\n=== TOTAL IMAGES BY CATEGORY ===`);
const categoryStats = {};
for (const [cat, imgs] of Object.entries(allImages)) {
  categoryStats[cat] = imgs.length;
  console.log(`${cat}: ${imgs.length} images`);
}
console.log(`TOTAL: ${Object.values(categoryStats).reduce((a,b)=>a+b,0)} images`);

console.log(`\n=== USED vs UNUSED ===`);
let unused = [];
for (const [category, imgList] of Object.entries(allImages)) {
  for (const img of imgList) {
    if (!usedImages.has(img.path)) {
      unused.push({ category, ...img });
    }
  }
}

console.log(`Used: ${usedImages.size}`);
console.log(`Unused: ${unused.length}\n`);

// Group unused by category
console.log(`=== UNUSED IMAGES BY CATEGORY ===\n`);
const unusedByCategory = {};
for (const img of unused) {
  if (!unusedByCategory[img.category]) unusedByCategory[img.category] = [];
  unusedByCategory[img.category].push(img);
}

for (const [cat, imgs] of Object.entries(unusedByCategory)) {
  console.log(`${cat} (${imgs.length}):`);
  imgs.slice(0, 5).forEach(img => console.log(`  ${img.path}`));
  if (imgs.length > 5) console.log(`  ... and ${imgs.length - 5} more`);
}

// Save unused to file for product creation
fs.writeFileSync('./unused_images_for_products.json', JSON.stringify(unusedByCategory, null, 2));
console.log(`\n✓ Saved unused images to unused_images_for_products.json`);
