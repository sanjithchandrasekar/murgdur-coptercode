/**
 * Generates styled product placeholder images by overlaying the Murgdur logo
 * on category-specific luxury backgrounds using jimp.
 *
 * Run: node generate_product_images.js
 * Output: client/public/images/generated/<name>.jpeg (800x1000px each)
 */

const Jimp = require("jimp");
const path = require("path");
const fs = require("fs");

const LOGO_SRC = path.join(__dirname, "client/public/images/logo.jpeg");
const OUT_DIR = path.join(__dirname, "client/public/images/generated");

// hex integer color (RGBA 0xRRGGBBAA)
const hex = (r, g, b) => Jimp.rgbaToInt(r, g, b, 255);

// Each product image: background color + optional accent color for a top strip
const IMAGES = [
  // ── Watches ──────────────────────────────────────────────────
  { name: "watch_heritage1.jpeg", bg: hex(14, 14, 28),  accent: hex(180, 140, 60)  },  // deep midnight + gold
  { name: "watch_sport1.jpeg",    bg: hex(10, 18, 32),  accent: hex(30, 90, 180)   },  // navy + sport blue
  { name: "watch_sport2.jpeg",    bg: hex(20, 20, 20),  accent: hex(200, 160, 60)  },  // charcoal + gold

  // ── Wallets ───────────────────────────────────────────────────
  { name: "wallet_cardholder2.jpeg", bg: hex(28, 14, 6),   accent: hex(139, 69, 19)   },  // dark espresso + saddle
  { name: "wallet_travel.jpeg",      bg: hex(20, 12, 4),   accent: hex(160, 100, 50)  },  // walnut + amber
  { name: "wallet_bifold2.jpeg",     bg: hex(12, 12, 12),  accent: hex(139, 69, 19)   },  // near-black + tan
  { name: "wallet_slim.jpeg",        bg: hex(35, 22, 10),  accent: hex(200, 140, 70)  },  // rich brown + gold
  { name: "wallet_zip.jpeg",         bg: hex(8, 8, 8),     accent: hex(212, 175, 55)  },  // jet black + gold

  // ── Sunglasses ────────────────────────────────────────────────
  { name: "sunglass_round.jpeg",  bg: hex(18, 18, 22),  accent: hex(112, 128, 144) },  // slate + silver
  { name: "sunglass_cateye.jpeg", bg: hex(10, 8, 6),    accent: hex(212, 175, 55)  },  // black + gold

  // ── Hoodies ───────────────────────────────────────────────────
  { name: "hoodie_navy.jpeg",  bg: hex(14, 30, 64),   accent: hex(100, 140, 200)  },  // navy + light blue
  { name: "hoodie_olive.jpeg", bg: hex(44, 54, 30),   accent: hex(140, 160, 90)   },  // olive + sage
  { name: "hoodie_grey.jpeg",  bg: hex(88, 90, 92),   accent: hex(220, 220, 220)  },  // grey + light grey

  // ── Sweaters ──────────────────────────────────────────────────
  { name: "sweater_cream.jpeg",    bg: hex(230, 220, 200), accent: hex(180, 150, 100) },  // cream + warm tan
  { name: "sweater_charcoal.jpeg", bg: hex(44, 54, 60),    accent: hex(120, 140, 150) },  // charcoal + steel
  { name: "sweater_maroon.jpeg",   bg: hex(90, 10, 10),    accent: hex(180, 80, 80)   },  // maroon + rose

  // ── T-Shirts ──────────────────────────────────────────────────
  { name: "tshirt_white.jpeg", bg: hex(240, 238, 232), accent: hex(200, 180, 140) },  // off-white + beige
  { name: "tshirt_black.jpeg", bg: hex(10, 10, 10),    accent: hex(212, 175, 55)  },  // jet black + gold
  { name: "tshirt_olive.jpeg", bg: hex(60, 72, 38),    accent: hex(140, 160, 90)  },  // olive + sage

  // ── Women's Shoes ─────────────────────────────────────────────
  { name: "womenshoe_heels2.jpeg", bg: hex(14, 10, 14),    accent: hex(180, 40, 60)   },  // near-black + crimson
  { name: "womenshoe_block.jpeg",  bg: hex(160, 100, 70),  accent: hex(110, 60, 30)   },  // tan + saddle
  { name: "womenshoe_sandal.jpeg", bg: hex(240, 225, 200), accent: hex(212, 175, 55)  },  // nude + gold
  { name: "womenshoe_heels3.jpeg", bg: hex(205, 180, 160), accent: hex(160, 130, 100) },  // nude mauve + tan
  { name: "womenshoe_flat.jpeg",   bg: hex(240, 210, 220), accent: hex(200, 140, 160) },  // blush + rose
];

// Canvas size
const W = 800;
const H = 1000;

// Logo occupies 55% of canvas width, centered vertically in middle 60%
const LOGO_W = Math.round(W * 0.55);

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function generateAll() {
  console.log("Loading logo …");
  const logoSrc = await Jimp.read(LOGO_SRC);

  let done = 0;

  for (const { name, bg, accent } of IMAGES) {
    const destPath = path.join(OUT_DIR, name);

    // ── 1. Build background canvas ─────────────────────────────
    const canvas = new Jimp(W, H, bg);

    // ── 2. Accent strip at top (10% height) ───────────────────
    const stripH = Math.round(H * 0.08);
    canvas.scan(0, 0, W, stripH, function (x, y, idx) {
      const fade = (stripH - y) / stripH; // 1 at top → 0 at bottom of strip
      const ar = (accent >> 24) & 0xff;
      const ag = (accent >> 16) & 0xff;
      const ab = (accent >> 8)  & 0xff;
      const br = (bg >> 24) & 0xff;
      const bg2 = (bg >> 16) & 0xff;
      const bb = (bg >> 8)  & 0xff;
      this.bitmap.data[idx]     = Math.round(ar * fade + br * (1 - fade));
      this.bitmap.data[idx + 1] = Math.round(ag * fade + bg2 * (1 - fade));
      this.bitmap.data[idx + 2] = Math.round(ab * fade + bb * (1 - fade));
      this.bitmap.data[idx + 3] = 255;
    });

    // ── 3. Subtle bottom accent strip ─────────────────────────
    const btmStart = H - stripH;
    canvas.scan(0, btmStart, W, stripH, function (x, y, idx) {
      const fade = (y - btmStart) / stripH; // 0 at top of strip → 1 at bottom
      const ar = (accent >> 24) & 0xff;
      const ag = (accent >> 16) & 0xff;
      const ab = (accent >> 8)  & 0xff;
      const br = (bg >> 24) & 0xff;
      const bg2 = (bg >> 16) & 0xff;
      const bb = (bg >> 8)  & 0xff;
      this.bitmap.data[idx]     = Math.round(ar * fade + br * (1 - fade));
      this.bitmap.data[idx + 1] = Math.round(ag * fade + bg2 * (1 - fade));
      this.bitmap.data[idx + 2] = Math.round(ab * fade + bb * (1 - fade));
      this.bitmap.data[idx + 3] = 255;
    });

    // ── 4. Composite centered logo ─────────────────────────────
    const logo = logoSrc.clone().resize(LOGO_W, Jimp.AUTO);
    const lx = Math.round((W - logo.bitmap.width) / 2);
    const ly = Math.round((H - logo.bitmap.height) / 2);
    canvas.composite(logo, lx, ly, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacitySource: 0.92,
      opacityDest: 1,
    });

    // ── 5. Save ────────────────────────────────────────────────
    await canvas.quality(88).writeAsync(destPath);
    done++;
    process.stdout.write(`  [${done}/${IMAGES.length}] ${name}\n`);
  }

  console.log(`\n✅ Done — ${done} images saved to:\n   ${OUT_DIR}`);
}

generateAll().catch((err) => { console.error("❌ Error:", err); process.exit(1); });
