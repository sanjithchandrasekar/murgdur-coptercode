#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('\n' + '='.repeat(80));
console.log('🔍 WOMEN\'S COLLECTION FILTERING & ARROW REMOVAL TEST');
console.log('='.repeat(80) + '\n');

// Test 1: Check if > arrow is removed
console.log('TEST 1: Verifying > Arrow Removal');
console.log('-'.repeat(80));

const shopPath = path.join(__dirname, 'client/src/pages/Shop.jsx');
const shopContent = fs.readFileSync(shopPath, 'utf-8');

const hasArrowElement = shopContent.includes('<div className="flex items-center ml-1 shrink-0 cursor-pointer" onClick={() => scrollTabs(\'right\')}>' );
console.log(`> Arrow Element Present: ${hasArrowElement ? '❌ FOUND (should be removed)' : '✓ NOT FOUND (removed successfully)'}`);

// Test 2: Check if Women's Collection path is correct
console.log('\n\nTEST 2: Women\'s Collection Category Filtering');
console.log('-'.repeat(80));

const menCollectionMatch = shopContent.match(/name:\s*["']Men's Collection["'][\s\S]*?path:\s*["']([^"']+)["']/);
const womenCollectionMatch = shopContent.match(/name:\s*["']Women's Collection["'][\s\S]*?path:\s*["']([^"']+)["']/);

console.log(`Men's Collection Path: ${menCollectionMatch ? menCollectionMatch[1] : 'NOT FOUND'}`);
console.log(`Women's Collection Path: ${womenCollectionMatch ? womenCollectionMatch[1] : 'NOT FOUND'}`);

// Verify category parameter
const womenUsesCategory = womenCollectionMatch && womenCollectionMatch[1].includes('category=Women');
console.log(`Women's Collection uses category parameter: ${womenUsesCategory ? '✓ YES' : '❌ NO'}`);

// Test 3: Check categoryFilter logic
console.log('\n\nTEST 3: Category Filter Logic');
console.log('-'.repeat(80));

const categoryFilterMatch = shopContent.match(/let categoryFilter\s*=\s*params\.get\(["']category["']\)|categoryFilter\s*=\s*params\.get\(["']category["']\)/);
console.log(`categoryFilter variable defined: ${categoryFilterMatch ? '✓ YES' : '❌ NO'}`);

const oldCatParamSupport = shopContent.match(/const oldCatParam\s*=\s*params\.get\(["']cat["']\)/);
console.log(`Old 'cat' parameter support: ${oldCatParamSupport ? '✓ YES' : '❌ NO'}`);

const categoryFilterLogic = shopContent.match(/if \(categoryFilter\)\s*\{\s*result\s*=\s*result\.filter\(\(p\)\s*=>\s*\(p\.category/);
console.log(`Category filtering logic implemented: ${categoryFilterLogic ? '✓ YES' : '❌ NO'}`);

const bothFormatsSupported = categoryFilterMatch && oldCatParamSupport;
console.log(`Both ?category and ?cat formats supported: ${bothFormatsSupported ? '✓ YES' : '❌ NO'}`);

// Test 4: Check product data for Men/Women categories
console.log('\n\nTEST 4: Product Data Structure');
console.log('-'.repeat(80));

const productsPath = path.join(__dirname, 'client/src/data/products.js');
const productsContent = fs.readFileSync(productsPath, 'utf-8');

const menProducts = (productsContent.match(/category:\s*["']Men["']/g) || []).length;
const womenProducts = (productsContent.match(/category:\s*["']Women["']/g) || []).length;
const accessoriesProducts = (productsContent.match(/category:\s*["']Accessories["']/g) || []).length;

console.log(`Men Products: ${menProducts}`);
console.log(`Women Products: ${womenProducts}`);
console.log(`Accessories Products: ${accessoriesProducts}`);

const allCategoriesPresent = menProducts > 0 && womenProducts > 0 && accessoriesProducts > 0;
console.log(`All categories present: ${allCategoriesPresent ? '✓ YES' : '❌ MISSING'}`);

// Test 5: Check header display logic
console.log('\n\nTEST 5: Header Display for Categories');
console.log('-'.repeat(80));

const headerLogic = shopContent.match(/categoryFilter\s*\?\s*`\${categoryFilter}'s Collection`/);
console.log(`Header shows category when set: ${headerLogic ? '✓ YES' : '❌ NO'}`);

// Test 6: Verify filteredProducts useMemo dependency
console.log('\n\nTEST 6: Filtering Dependencies');
console.log('-'.repeat(80));

const depsMatch = shopContent.match(/\[\s*productsSource,[\s\S]*?categoryFilter,?\s*\]/);
const hasCategoryFilterInDeps = shopContent.includes('categoryFilter,') && 
                                 shopContent.match(/useMemo[\s\S]*?categoryFilter[\s\S]*?\]/);

console.log(`categoryFilter in useMemo dependencies: ${hasCategoryFilterInDeps ? '✓ YES' : '❌ NO'}`);

// Summary
console.log('\n\n' + '='.repeat(80));
console.log('FEATURE VERIFICATION SUMMARY');
console.log('='.repeat(80));

const checks = [
  { name: 'Arrow Removed', pass: !hasArrowElement },
  { name: 'Women\'s Collection Path Set', pass: womenUsesCategory },
  { name: 'Men\'s Collection Path Set', pass: menCollectionMatch !== null },
  { name: 'Category Filter Variable', pass: categoryFilterMatch !== null },
  { name: 'Old Cat Parameter Support', pass: oldCatParamSupport !== null },
  { name: 'Category Filter Logic', pass: categoryFilterLogic !== null },
  { name: 'Men Products in DB', pass: menProducts > 0 },
  { name: 'Women Products in DB', pass: womenProducts > 0 },
  { name: 'Accessories Products in DB', pass: accessoriesProducts > 0 },
  { name: 'Header Display Logic', pass: headerLogic !== null },
  { name: 'useMemo Dependencies', pass: hasCategoryFilterInDeps },
];

let passCount = 0;
checks.forEach(check => {
  const status = check.pass ? '✓' : '✗';
  console.log(`${status} ${check.name}`);
  if (check.pass) passCount++;
});

console.log('\n' + '='.repeat(80));
console.log(`TESTS PASSED: ${passCount}/${checks.length}`);
console.log('='.repeat(80) + '\n');

if (passCount === checks.length) {
  console.log('🎉 ALL FEATURES WORKING PROPERLY!');
  console.log('\n✅ Women\'s Collection filtering is ready');
  console.log('✅ Arrow navigation element removed');
  console.log('✅ Category-based product display implemented\n');
} else {
  console.log('⚠️  Some checks failed - review above\n');
}

process.exit(passCount === checks.length ? 0 : 1);
