const { products } = require('./client/src/data/products.js');

const types = {};
products.forEach(p => {
  if (types[p.type]) {
    types[p.type]++;
  } else {
    types[p.type] = 1;
  }
});

console.log('Product count by type:\n');
Object.entries(types)
  .sort((a, b) => b[1] - a[1])
  .forEach(([type, count]) => {
    console.log(`  ${type}: ${count} products`);
  });

// Check what's missing from CATEGORY_TABS
const CATEGORY_TABS = [
  'all', 'shoes', 'bags', 'travel', 'watches', 'jewellery',
  'clothing', 'dresses', 'shirts', 'belts',
  'sunglasses', 'perfumes', 'wallets', 'accessories'
];

console.log('\n\nProduct types NOT in CATEGORY_TABS:\n');
const missing = Object.keys(types).filter(t => !CATEGORY_TABS.includes(t) && t !== 'accessories');
if (missing.length === 0) {
  console.log('  ✓ All product types have tabs!');
} else {
  missing.forEach(t => {
    console.log(`  ✗ ${t}: ${types[t]} products (NOT in tabs)`);
  });
}

console.log('\n\nCATEGORY_TABS not in product types:\n');
const unused = CATEGORY_TABS.filter(t => !Object.keys(types).includes(t) && t !== 'all' && t !== 'accessories' && t !== 'jewellery');
if (unused.length === 0) {
  console.log('  ✓ All tabs have products!');
} else {
  unused.forEach(t => {
    console.log(`  - ${t}: 0 products`);
  });
}
