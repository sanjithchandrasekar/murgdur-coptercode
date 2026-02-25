/**
 * assign_product_ids.mjs
 * Assigns MURG-XXXX productId to all Sanity product documents
 * and updates the static products.js file with matching productIds
 *
 * Run: node assign_product_ids.mjs
 */

import { createClient } from "@sanity/client";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PROJECT_ID = "qbaw2yts";
const TOKEN =
  "skhKjccyqXjuBAOwCUYHvUXFMKSrgbVlfIIQR0pPDsUGsyTYj3UGRlaWTsn6D8RpKcZ9N4ot6VHw82CEGClEpISRlgXsYqsdHLGue9NKmhDQ3N6DySir23xyLwa7AFLUcxX1S8cGphK03p2vEpynuI0yZhkHf98AS8E8XmUHyKI6R0d9wHNL";

const client = createClient({
  projectId: PROJECT_ID,
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-22",
  token: TOKEN,
});

// ─── 1. PATCH ALL SANITY PRODUCTS ─────────────────────────────────────────

async function assignSanityProductIds() {
  console.log("Fetching all products from Sanity...");
  const query = `*[_type == "product" && !(_id in path("drafts.**"))] | order(_createdAt asc) { _id, name, productId }`;
  const products = await client.fetch(query);

  console.log(`Found ${products.length} products in Sanity.`);

  let mutations = [];
  let count = 0;

  for (const product of products) {
    count++;
    const productId = `MURG-${String(count).padStart(4, "0")}`;

    // Skip if already set
    if (product.productId === productId) {
      console.log(`  ✓ ${product.name} → already has ${productId}`);
      continue;
    }

    mutations.push({
      patch: {
        id: product._id,
        set: { productId },
      },
    });

    // Commit in batches of 50
    if (mutations.length >= 50) {
      await client.mutate(mutations);
      console.log(`  → Committed batch of ${mutations.length} mutations`);
      mutations = [];
    }
  }

  // Commit remaining
  if (mutations.length > 0) {
    await client.mutate(mutations);
    console.log(`  → Committed final batch of ${mutations.length} mutations`);
  }

  console.log(`\n✅ Done! Assigned productIds to ${products.length} Sanity products.`);
  return products.map((p, i) => ({ ...p, productId: `MURG-${String(i + 1).padStart(4, "0")}` }));
}

// ─── 2. UPDATE STATIC products.js ─────────────────────────────────────────

async function addProductIdsToStaticFile() {
  const productsFilePath = join(__dirname, "client", "src", "data", "products.js");
  let content = readFileSync(productsFilePath, "utf-8");

  // Match all product objects with their id field
  // Add productId right after the id line if not already present
  let idCounter = 0;
  const updated = content.replace(
    /(\s+id:\s*(\d+),)/g,
    (match, full, numId) => {
      const padded = `MURG-${String(parseInt(numId)).padStart(4, "0")}`;
      // Only add productId if not already present in the next few chars
      return `${full}\n    productId: "${padded}",`;
    }
  );

  // Guard: don't double-add
  if (content.includes('productId: "MURG-')) {
    console.log("  ℹ️  Static products.js already has productIds — skipping.");
    return;
  }

  writeFileSync(productsFilePath, updated, "utf-8");
  console.log("✅ Added productIds to client/src/data/products.js");
}

// ─── MAIN ─────────────────────────────────────────────────────────────────

(async () => {
  try {
    await assignSanityProductIds();
    await addProductIdsToStaticFile();
    console.log("\n🎉 All done! Product IDs assigned everywhere.");
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
})();
