import fs from 'fs';
import path from 'path';

// Read the unused images JSON
const unusedData = JSON.parse(fs.readFileSync('./unused_images_for_products.json', 'utf-8'));

// Parse products.js to count existing
const productsFileContent = fs.readFileSync('./client/src/data/products.js', 'utf-8');
const productMatches = productsFileContent.matchAll(/{\s*id:\s*(\d+),\s*name:\s*"([^"]+)"/g);
const existingProducts = [];
for (const match of productMatches) {
  existingProducts.push({ id: parseInt(match[1]), name: match[2] });
}

const maxId = Math.max(...existingProducts.map(p => p.id));
const existingNames = new Set(existingProducts.map(p => p.name.toLowerCase()));

console.log(`Existing products: ${existingProducts.length}, Max ID: ${maxId}`);

const descriptions = {
  'watch': 'Precision Swiss chronograph timepiece with automatic movement.',
  'sherwani': 'Exquisitely embroidered traditional formal wear with silk finish.',
  'achkan': 'Classic royal formal neckwear with traditional craftsmanship.',
  'hoodie': 'Premium comfort wear in luxury cotton blend fabric.',
  'hoody': 'Premium comfort wear in luxury cotton blend fabric.',
  'sweater': 'Fine-knit luxury pullover in premium materials.',
  'tee': 'Graphic tee with signature royal design and premium finish.',
  'shirt': 'Tailored casual shirt in premium fabric with modern cut.',
  'shoe': 'Handcrafted luxury footwear with premium leather upper.',
  'slipper': 'Comfortable indoor slipper with cushioned sole.',
  'wallet': 'Slim-profile cardholder with multiple compartments.',
  'clutch': 'Evening clutch with metallic accents perfect for galas.',
  'bag': 'Handcrafted luxury bag with intricate craftsmanship.',
  'sunglasses': 'UV-protected luxury eyewear with premium materials.',
  'dress': 'Elegant formal dress piece with luxury fabric.',
  'handbag': 'Premium shoulder or crossbody bag with leather finish.',
  'perfume': 'Luxury fragrance with notes of amber and sandalwood.',
};

function cleanProductName(folder) {
  // Remove "new/" prefix if present
  let name = folder.replace(/^new\//, '').trim();
  
  // Extract base product name from descriptive names
  // e.g., "Canvas & Leather Bucket Bag (Drawstring top, casual luxury)" -> "Canvas & Leather Bucket Bag"
  name = name.replace(/\s*\([^)]*\)$/, '');
  
  // Clean up generic names
  if (name.toLowerCase().includes('hoody')) name = 'Premium Luxury Hoodie';
  
  return name;
}

function determineCategory(productName) {
  const lower = productName.toLowerCase();
  
  // Women's items
  if (lower.includes('lehenga') || lower.includes('saree') || lower.includes('dress') || 
      lower.includes('gown') || lower.includes('anarkali')) {
    return 'Women';
  }
  
  // Men's items
  if (lower.includes('sherwani') || lower.includes('achkan') || lower.includes('tuxedo') ||
      lower.includes('bandhgala') || lower.includes('suit') || lower.includes('hoodie') ||
      lower.includes('hoody') || lower.includes('sweater') || lower.includes('shirt') ||
      lower.includes('shoe') || lower.includes('slipper')) {
    return 'Men';
  }
  
  // Accessories
  if (lower.includes('bag') || lower.includes('wallet') || lower.includes('watch') ||
      lower.includes('sunglasses') || lower.includes('perfume') || lower.includes('clutch') ||
      lower.includes('trunk') || lower.includes('case') || lower.includes('holder')) {
    return 'Accessories';
  }
  
  return 'Accessories';
}

function determineType(productName) {
  const lower = productName.toLowerCase();
  
  if (lower.includes('watch') || lower.includes('chronos') || lower.includes('tourbillon') ||
      lower.includes('automatic') || lower.includes('heritage')) return 'watches';
  if (lower.includes('sherwani')) return 'sherwanis';
  if (lower.includes('achkan')) return 'sherwanis';
  if (lower.includes('hoodie') || lower.includes('hoody')) return 'hoodies';
  if (lower.includes('sweater')) return 'sweaters';
  if (lower.includes('tee') || lower.includes('graphic')) return 'shirts';
  if (lower.includes('shirt')) return 'shirts';
  if (lower.includes('shoe')) return 'shoes';
  if (lower.includes('slipper')) return 'slippers';
  if (lower.includes('wallet')) return 'wallets';
  if (lower.includes('cardholder')) return 'wallets';
  if (lower.includes('clutch')) return 'clutches';
  if (lower.includes('handbag') || lower.includes('tote') || lower.includes('shoulder')) return 'bags';
  if (lower.includes('bag')) return 'bags';
  if (lower.includes('trunk') || lower.includes('duffle') || lower.includes('keepall')) return 'luggage';
  if (lower.includes('perfume')) return 'perfumes';
  if (lower.includes('sunglasses') || lower.includes('sunglass')) return 'sunglasses';
  if (lower.includes('dress') || lower.includes('lehenga') || lower.includes('gown')) return 'dresses';
  
  return 'accessories';
}

function getPriceRange(productName) {
  const lower = productName.toLowerCase();
  
  if (lower.includes('watch') || lower.includes('chronos') || lower.includes('tourbillon')) 
    return [35000, 150000];
  if (lower.includes('sherwani')) return [18000, 50000];
  if (lower.includes('achkan')) return [15000, 40000];
  if (lower.includes('lehenga') || lower.includes('gown')) return [25000, 75000];
  if (lower.includes('dress')) return [8000, 30000];
  if (lower.includes('handbag') || lower.includes('tote') || lower.includes('shoulder')) 
    return [12000, 45000];
  if (lower.includes('clutch')) return [5000, 18000];
  if (lower.includes('bag')) return [8000, 25000];
  if (lower.includes('wallet')) return [4000, 15000];
  if (lower.includes('hoodie') || lower.includes('hoody')) return [3500, 9000];
  if (lower.includes('sweater')) return [4500, 12000];
  if (lower.includes('shirt') || lower.includes('tee')) return [2500, 8000];
  if (lower.includes('sunglasses')) return [3500, 12000];
  if (lower.includes('perfume')) return [6000, 18000];
  
  return [3000, 10000];
}

function generateDescription(productName) {
  const lower = productName.toLowerCase();
  
  for (const [key, desc] of Object.entries(descriptions)) {
    if (lower.includes(key)) {
      return desc;
    }
  }
  
  return `Premium luxury ${productName.toLowerCase()}. Crafted with finest materials and exquisite attention to detail.`;
}

function generatePrice(priceRange) {
  const [min, max] = priceRange;
  const round = 500;
  return Math.round((Math.random() * (max - min) + min) / round) * round;
}

function createProduct(productName, imagePath, id) {
  const priceRange = getPriceRange(productName);
  const price = generatePrice(priceRange);
  
  return {
    id: id.toString(),
    name: productName,
    price: price,
    originalPrice: Math.round(price * 1.18 / 500) * 500,
    image: imagePath,
    category: determineCategory(productName),
    type: determineType(productName),
    description: generateDescription(productName),
    images: [imagePath],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1a1a1a', '#2c3e50', '#8b4513', '#5d4037', '#4a4a4a'],
    rating: (4.0 + Math.random() * 1.0).toFixed(1),
    reviews: Math.floor(Math.random() * 120) + 30,
  };
}

const newProducts = [];
let currentId = maxId + 1;

// Process all unused images, creating one product per folder
const processedFolders = new Set();

for (const [folder, images] of Object.entries(unusedData)) {
  if (folder === 'root' || !folder || images.length === 0) continue;
  if (processedFolders.has(folder)) continue;
  
  processedFolders.add(folder);
  
  const cleanName = cleanProductName(folder);
  
  // Skip if duplicate
  if (existingNames.has(cleanName.toLowerCase())) {
    console.log(`⊘ Skipping duplicate: ${cleanName}`);
    continue;
  }
  
  // Get first image
  const imagePath = images[0].path;
  if (!imagePath) continue;
  
  const product = createProduct(cleanName, imagePath, currentId);
  newProducts.push(product);
  currentId++;
}

console.log(`\n✓ Generated ${newProducts.length} new products`);

// Save to file
fs.writeFileSync('./new_products_generated.json', JSON.stringify(newProducts, null, 2));
console.log('✓ Saved to new_products_generated.json');

// Summary by category
const byCategory = {};
newProducts.forEach(p => {
  if (!byCategory[p.category]) byCategory[p.category] = [];
  byCategory[p.category].push(p);
});

console.log('\nNew products by category:');
for (const [cat, prods] of Object.entries(byCategory)) {
  console.log(`\n${cat} (${prods.length}):`);
  prods.slice(0, 5).forEach(p => {
    console.log(`  • ${p.name} - ₹${p.price} (${p.type})`);
  });
  if (prods.length > 5) {
    console.log(`  ... and ${prods.length - 5} more`);
  }
}
