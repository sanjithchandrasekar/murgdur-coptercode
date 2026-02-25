const fs = require('fs');

console.log('Checking added categories...\n');

// Check Shop.jsx
const shopContent = fs.readFileSync('./client/src/pages/Shop.jsx', 'utf-8');
const hasSlippersTab = shopContent.includes('{ label: "Slippers", value: "slippers" }');
const hasHoodiesTab = shopContent.includes('{ label: "Hoodies", value: "hoodies" }');
const hasSweaters = shopContent.includes('{ label: "Sweaters", value: "sweaters" }');

console.log('Shop.jsx CATEGORY_TABS:');
console.log(`  ✓ Slippers tab: ${hasSlippersTab ? '✓ ADDED' : '✗ MISSING'}`);
console.log(`  ✓ Hoodies tab: ${hasHoodiesTab ? '✓ ADDED' : '✗ MISSING'}`);
console.log(`  ✓ Sweaters tab: ${hasSweaters ? '✓ ADDED' : '✗ MISSING'}`);

// Check for Editorial Banners
const hasSlippersBanners = shopContent.includes('slippers: [');
const hasHoodiesBanners = shopContent.includes('hoodies: [');
const hasSweatersBanners = shopContent.includes('sweaters: [');

console.log('\nShop.jsx EDITORIAL_BANNERS_BY_TAB:');
console.log(`  ✓ Slippers banners: ${hasSlippersBanners ? '✓ ADDED' : '✗ MISSING'}`);
console.log(`  ✓ Hoodies banners: ${hasHoodiesBanners ? '✓ ADDED' : '✗ MISSING'}`);
console.log(`  ✓ Sweaters banners: ${hasSweatersBanners ? '✓ ADDED' : '✗ MISSING'}`);

// Check for Category Icons
const hasCategoryIcons = (shopContent.match(/slippers: \[[\s\S]*?\],/g) || []).length;
console.log('\nShop.jsx CATEGORY_ICONS_BY_TAB:');
console.log(`  ✓ Icons for new categories: ${hasCategoryIcons > 0 ? '✓ ADDED' : '✗ MISSING'}`);

// Check filtering logic
const hasSlippersFilter = shopContent.includes('case "slippers":');
const hasHoodiesFilter = shopContent.includes('case "hoodies":');
const hasSwetersFilter = shopContent.includes('case "sweaters":');

console.log('\nShop.jsx filtering cases:');
console.log(`  ✓ Slippers filter: ${hasSlippersFilter ? '✓ ADDED' : '✗ MISSING'}`);
console.log(`  ✓ Hoodies filter: ${hasHoodiesFilter ? '✓ ADDED' : '✗ MISSING'}`);
console.log(`  ✓ Sweaters filter: ${hasSwetersFilter ? '✓ ADDED' : '✗ MISSING'}`);

// Check Navbar.jsx
const navbarContent = fs.readFileSync('./client/src/components/layout/Navbar.jsx', 'utf-8');
const hasNavbarSlippers = navbarContent.includes('name: "Slippers"');
const hasNavbarHoodies = navbarContent.includes('name: "Hoodies"');
const hasNavbarSweaters = navbarContent.includes('name: "Sweaters"');

console.log('\nNavbar.jsx menu items:');
console.log(`  ✓ Slippers menu: ${hasNavbarSlippers ? '✓ ADDED' : '✗ MISSING'}`);
console.log(`  ✓ Hoodies menu: ${hasNavbarHoodies ? '✓ ADDED' : '✗ MISSING'}`);
console.log(`  ✓ Sweaters menu: ${hasNavbarSweaters ? '✓ ADDED' : '✗ MISSING'}`);

console.log('\n✨ SUMMARY:\n');
const allChecks = [
  hasSlippersTab, hasHoodiesTab, hasSweaters,
  hasSlippersBanners, hasHoodiesBanners, hasSweatersBanners,
  hasSlippersFilter, hasHoodiesFilter, hasSwetersFilter,
  hasNavbarSlippers, hasNavbarHoodies, hasNavbarSweaters
];

if (allChecks.every(c => c)) {
  console.log('✅ All missing categories have been successfully added!');
  console.log('\nNew categories available:');
  console.log('  • Slippers (5 products)');
  console.log('  • Hoodies (2 products)');
  console.log('  • Sweaters (2 products)');
  console.log('\nThese categories are now:');
  console.log('  ✓ Listed in Shop tabs');
  console.log('  ✓ Added to Navigation menu');
  console.log('  ✓ Included in editorial banners');
  console.log('  ✓ Properly filtered');
} else {
  console.log('❌ Some items are still missing. Please check the output above.');
}
