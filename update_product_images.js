/**
 * Updates products.js: replaces /images/logo.jpeg with the correct
 * /images/generated/<name>.jpeg path for each product.
 * Run: node update_product_images.js
 */

const fs = require("fs");
const path = require("path");

const PRODUCTS_FILE = path.join(__dirname, "client/src/data/products.js");

// Map: unique product name snippet → generated image filename
const MAP = [
  // Watches
  { anchor: '"Sapphire Tourbillon"',       img: "watch_heritage1" },
  { anchor: '"Royal Sport Chronos"',       img: "watch_sport1"    },
  { anchor: '"Heritage Automatic"',        img: "watch_sport2"    },
  // Wallets
  { anchor: '"Slim Signature Cardholder"', img: "wallet_cardholder2" },
  { anchor: '"Zip-Around Travel Wallet"',  img: "wallet_travel"      },
  { anchor: '"Signature Bifold"',          img: "wallet_bifold2"     },
  { anchor: '"Crocodile Embossed Slim"',   img: "wallet_slim"        },
  { anchor: '"Long Chain Wallet Clutch"',  img: "wallet_zip"         },
  // Sunglasses
  { anchor: '"Round Titanium Frames"',     img: "sunglass_round"  },
  { anchor: '"Cat Eye Sunglasses"',        img: "sunglass_cateye" },
  // Hoodies
  { anchor: '"Navy Heritage Hoodie"',         img: "hoodie_navy"  },
  { anchor: '"Olive Zip Hoodie"',             img: "hoodie_olive" },
  { anchor: '"Heather Grey Pullover Hoodie"', img: "hoodie_grey"  },
  // Sweaters
  { anchor: '"Cream Merino Turtleneck"', img: "sweater_cream"    },
  { anchor: '"Charcoal Cable Knit"',     img: "sweater_charcoal" },
  { anchor: '"Maroon V-Neck Sweater"',   img: "sweater_maroon"   },
  // T-shirts
  { anchor: '"Signature White T-Shirt"',    img: "tshirt_white" },
  { anchor: '"Murgdur Black Crest Tee"',    img: "tshirt_black" },
  { anchor: '"Olive Washed Pocket Tee"',    img: "tshirt_olive" },
  // Women shoes
  { anchor: '"Stiletto Heels"',    img: "womenshoe_heels2" },
  { anchor: '"Block Heel Mules"',  img: "womenshoe_block"  },
  { anchor: '"Strappy Flat Sandals"', img: "womenshoe_sandal"  },
  { anchor: '"Kitten Heel Pumps"', img: "womenshoe_heels3" },
  { anchor: '"Ballet Flats"',      img: "womenshoe_flat"   },
];

let content = fs.readFileSync(PRODUCTS_FILE, "utf8");
let totalReplaced = 0;

for (const { anchor, img } of MAP) {
  const anchorIdx = content.indexOf(anchor);
  if (anchorIdx === -1) {
    console.warn(`⚠️  Anchor not found: ${anchor}`);
    continue;
  }

  // Find the NEXT closing object brace from this anchor
  const blockEnd = content.indexOf("\n  },", anchorIdx);
  if (blockEnd === -1) {
    console.warn(`⚠️  Block end not found for: ${anchor}`);
    continue;
  }

  const block = content.slice(anchorIdx, blockEnd + 6);
  const newPath = `/images/generated/${img}.jpeg`;

  const updatedBlock = block.replace(/\/images\/logo\.jpeg/g, newPath);
  const count = (block.match(/\/images\/logo\.jpeg/g) || []).length;

  if (count === 0) {
    console.log(`ℹ️  No logo.jpeg found for: ${anchor} (may already be updated)`);
    continue;
  }

  content = content.slice(0, anchorIdx) + updatedBlock + content.slice(anchorIdx + block.length);
  console.log(`✓  ${anchor} → ${newPath}  (${count} replaced)`);
  totalReplaced += count;
}

fs.writeFileSync(PRODUCTS_FILE, content, "utf8");
console.log(`\n✅ Done — ${totalReplaced} path(s) updated in products.js`);
