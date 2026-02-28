/**
 * Migration script: Add missing products to Sanity
 * Adds 79 products from local products.js that are not yet in Sanity.
 * Run: node add_missing_products.js   (inside murgdur-studio folder)
 */
const { getCliClient } = require('sanity/cli');

const client = getCliClient({ apiVersion: '2024-01-22' });

// ── helpers ──────────────────────────────────────────────────────────────────
function toSlug(name, productId) {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const id = productId.toLowerCase();
  return `${base}-${id}`;
}

const COLOR_NAMES = {
  '#000000': 'Black', '#ffffff': 'White', '#ff0000': 'Red', '#00ff00': 'Green',
  '#0000ff': 'Blue', '#ffd700': 'Gold', '#c0c0c0': 'Silver', '#808080': 'Grey',
  '#a52a2a': 'Brown', '#800080': 'Purple', '#ffc0cb': 'Pink', '#ff6600': 'Orange',
  '#ffff00': 'Yellow', '#008000': 'Dark Green', '#000080': 'Navy',
  '#4b0082': 'Indigo', '#dc143c': 'Crimson', '#fffdd0': 'Ivory',
  '#800000': 'Maroon', '#1a237e': 'Royal Blue', '#4a148c': 'Deep Purple',
  '#b71c1c': 'Dark Red', '#004d40': 'Teal', '#3e2723': 'Dark Brown',
  '#8b4513': 'Saddle Brown', '#d2691e': 'Chocolate', '#5d4037': 'Mocha',
  '#2c3e50': 'Charcoal Blue', '#455a64': 'Blue Grey', '#303f9f': 'Indigo Blue',
  '#4a4a4a': 'Dark Grey', '#c8a800': 'Dark Gold', '#b8860b': 'Dark Goldenrod',
};

function colorName(hex) {
  return COLOR_NAMES[hex.toLowerCase()] || hex.replace('#', '').toUpperCase();
}

function mapColors(colorArr) {
  if (!Array.isArray(colorArr)) return [];
  return colorArr.map(c => ({
    _type: 'object',
    name: colorName(c),
    hex: c,
  }));
}

// ── load pre-generated missing products JSON ─────────────────────────────────
const fs = require('fs');
const path = require('path');

const missingProducts = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../missing_products_data.json'), 'utf8')
);
const MISSING_IDS = missingProducts.map(p => p.productId);
console.log(`Loaded ${missingProducts.length} products to add`);

// ── build & upload mutations ─────────────────────────────────────────────────
async function run() {
  let created = 0;
  let skipped = 0;

  for (const p of missingProducts) {
    // Guard: check if already exists in Sanity (handles re-runs)
    const existing = await client.fetch(
      `*[_type == "product" && productId == $pid][0]._id`,
      { pid: p.productId }
    );
    if (existing) {
      console.log(`  ⏭  Already in Sanity: ${p.productId} – ${p.name}`);
      skipped++;
      continue;
    }

    const doc = {
      _type: 'product',
      productId: p.productId,
      name: p.name,
      slug: { _type: 'slug', current: toSlug(p.name, p.productId) },
      price: p.price,
      originalPrice: p.originalPrice || null,
      category: p.category,
      type: p.type || 'clothing',
      description: p.description || '',
      sizes: Array.isArray(p.sizes) ? p.sizes : [],
      colors: mapColors(p.colors),
      rating: p.rating || 5,
      reviews: p.reviews || 0,
      featured: false,
      stock: 10,
      isNew: false,
      onSale: !!(p.originalPrice && p.originalPrice > p.price),
    };

    try {
      const result = await client.create(doc);
      console.log(`  ✅ Created: ${p.productId} – ${p.name} (${result._id})`);
      created++;
    } catch (err) {
      console.error(`  ❌ Failed: ${p.productId} – ${p.name}:`, err.message);
    }
  }

  console.log(`\nDone. Created: ${created}, Skipped (already existed): ${skipped}`);

  // Publish all newly created drafts
  console.log('\nPublishing new drafts...');
  const drafts = await client.fetch(
    `*[_type == "product" && productId in $ids && _id in path("drafts.**")]._id`,
    { ids: MISSING_IDS }
  );
  console.log(`Found ${drafts.length} draft(s) to publish`);
  for (const draftId of drafts) {
    const publishedId = draftId.replace(/^drafts\./, '');
    try {
      await client
        .patch(draftId)
        .commit({ publish: true });
    } catch (e) {
      // Use transaction to publish
      try {
        await client.transaction()
          .createOrReplace({ ...await client.getDocument(draftId), _id: publishedId })
          .delete(draftId)
          .commit();
        console.log(`  📢 Published: ${publishedId}`);
      } catch (e2) {
        console.error(`  ⚠️  Could not publish ${draftId}:`, e2.message);
      }
    }
  }
  console.log('\n✅ Migration complete.');
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
