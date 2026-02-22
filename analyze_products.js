const fs = require('fs');
const content = fs.readFileSync('client/src/data/products.js', 'utf8');
const lines = content.split('\n');

const products = [];
let current = null;

lines.forEach((line) => {
  const idMatch = line.match(/^\s*id:\s*(\d+)/);
  if (idMatch) {
    if (current) products.push(current);
    current = { id: idMatch[1] };
  }
  if (current) {
    const nameMatch = line.match(/^\s*name:\s*["'](.+?)["']/);
    if (nameMatch) current.name = nameMatch[1];

    const imgMatch = line.match(/^\s*image:\s*["'](.+?)["']/);
    if (imgMatch) current.image = imgMatch[1];

    const typeMatch = line.match(/^\s*type:\s*["'](.+?)["']/);
    if (typeMatch) current.type = typeMatch[1];

    const catMatch = line.match(/^\s*category:\s*["'](.+?)["']/);
    if (catMatch) current.category = catMatch[1];
  }
});
if (current) products.push(current);

// Count image usage
const imageCounts = {};
products.forEach(p => {
  if (p.image) imageCounts[p.image] = (imageCounts[p.image] || 0) + 1;
});

// Categorize each product's image status
const withLogo      = products.filter(p => p.image && p.image.includes('logo.jpeg'));
const withGenerated = products.filter(p => p.image && p.image.includes('/generated/'));
const withShared    = products.filter(p => p.image && imageCounts[p.image] >= 3 && !p.image.includes('/generated/') && !p.image.includes('logo.jpeg'));
const withUnique    = products.filter(p => p.image && imageCounts[p.image] < 3 && !p.image.includes('/generated/') && !p.image.includes('logo.jpeg'));

console.log('======================================================');
console.log('  TOTAL PRODUCTS:', products.length);
console.log('======================================================\n');

console.log('--- USING logo.jpeg (need generated image) ---');
withLogo.forEach(p => console.log(`  ID ${p.id.padStart(3)}  [${(p.category||'').padEnd(12)} / ${(p.type||'').padEnd(12)}]  ${p.name}`));

console.log('\n--- ALREADY HAVE generated/ images ---');
withGenerated.forEach(p => console.log(`  ID ${p.id.padStart(3)}  [${(p.category||'').padEnd(12)} / ${(p.type||'').padEnd(12)}]  ${p.name}  -> ${p.image}`));

console.log('\n--- USING SHARED / GENERIC images (same image on 3+ products) ---');
const sharedGroups = {};
withShared.forEach(p => {
  if (!sharedGroups[p.image]) sharedGroups[p.image] = [];
  sharedGroups[p.image].push(p);
});
Object.entries(sharedGroups).sort((a,b) => b[1].length - a[1].length).forEach(([img, prods]) => {
  console.log(`\n  ${prods.length}x  ${img}`);
  prods.forEach(p => console.log(`       ID ${p.id.padStart(3)}  [${(p.category||'').padEnd(12)} / ${(p.type||'').padEnd(12)}]  ${p.name}`));
});

console.log('\n--- HAVE UNIQUE images (good, no action needed) ---');
withUnique.forEach(p => console.log(`  ID ${p.id.padStart(3)}  [${(p.category||'').padEnd(12)} / ${(p.type||'').padEnd(12)}]  ${p.name}  -> ${p.image}`));

console.log('\n======================================================');
console.log('SUMMARY:');
console.log(`  With logo.jpeg placeholder  : ${withLogo.length} products → NEED NEW IMAGES`);
console.log(`  With generated/ images      : ${withGenerated.length} products → branded but basic`);
console.log(`  Sharing generic images      : ${withShared.length} products → ideally unique`);
console.log(`  Unique proper images        : ${withUnique.length} products → OK`);
console.log('======================================================');
