const fs = require('fs');
const path = require('path');
const { getCliClient } = require('sanity/cli');

// Sanity Config
const client = getCliClient({
    apiVersion: '2024-01-22',
});


// 1. Manually Defined Image Map from products.js top lines
const IMG_VARS = {
    imgSherwani: "/images/royal_sherwani.png",
    imgLehenga: "/images/Gemini_Generated_Image_aimaqdaimaqdaima.png",
    imgBag: "/images/hand bag.png",
    imgBandhgala: "/images/Gemini_Generated_Image_iqsqcdiqsqcdiqsq.png",
    imgSaree: "/images/royal_saree.png",
    imgWallet: "/images/royal_wallet.png",
    imgAchkan: "/images/royal_sherwani.png",
    imgGown: "/images/royal_gown.png",
    imgClutch: "/images/Gemini_Generated_Image_r281slr281slr281.png",
    imgJacket: "/images/Gemini_Generated_Image_j3qrpwj3qrpwj3qr.png",
    imgSaree2: "/images/Gemini_Generated_Image_yunch4yunch4yunc.png",
    imgAnarkali: "/images/Gemini_Generated_Image_2heebf2heebf2hee.png",
    imgTuxedo: "/images/Gemini_Generated_Image_5pgtfq5pgtfq5pgt.png",
    imgBandi: "/images/Gemini_Generated_Image_687ijq687ijq687i.png",
    imgRoseLehenga: "/images/Gemini_Generated_Image_6x7jv96x7jv96x7j.png",
    imgGenericMen: "/images/Gemini_Generated_Image_96hr3v96hr3v96hr.png",
    imgGenericAcc: "/images/Gemini_Generated_Image_sx86uosx86uosx86.png",
};

// 2. Read raw products.js file
const productsFile = fs.readFileSync(path.join(__dirname, '../client/src/data/products.js'), 'utf8');

// 3. Extract the array string using regex
const match = productsFile.match(/export const products = (\[[\s\S]*?\]);/);
if (!match) {
    console.error("Could not parse products array from file");
    process.exit(1);
}

// 4. Clean up the string to be valid JSON
// Replace variable names (e.g. imgSherwani) with their string values
let arrayString = match[1];

Object.keys(IMG_VARS).forEach(varName => {
    // Replace standalone variable usage or usage in arrays
    const regex = new RegExp(`\\b${varName}\\b`, 'g');
    arrayString = arrayString.replace(regex, `"${IMG_VARS[varName]}"`);
});

// Since it's a JS file, keys might not be quoted (e.g. id: 1 instead of "id": 1)
// We need to evaluate it safely or parse it loosely. 
// Using eval in a migration script controlled by us is acceptable for speed.
let products = [];
try {
    products = eval(arrayString);
} catch (e) {
    console.error("Error evaluating products array:", e);
    // Fallback: try to add quotes to keys if eval fails (simple parser)
    // But eval should work if variables are replaced.
    process.exit(1);
}

// 5. Migration Logic
const PUBLIC_DIR = path.join(__dirname, '../client/public');

const uploadImage = async (imagePath) => {
    if (!imagePath) return null;

    // Check if it's a remote URL
    if (imagePath.startsWith('http')) {
        // Warning: Sanity upload from URL supported? Yes, passing url directly to upload() works? No, need buffer/stream.
        // For simplicity, we might skip remote URLs validation or fetch them.
        // Actually, let's fetch them first.
        try {
            const res = await fetch(imagePath);
            const arrayBuffer = await res.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const asset = await client.assets.upload('image', buffer, { filename: path.basename(imagePath) });
            return asset;
        } catch (e) {
            console.error(`Failed to upload remote image ${imagePath}:`, e.message);
            return null;
        }
    }

    // Local file
    // Handle URL encoded paths
    const decodedPath = decodeURIComponent(imagePath);
    const fullPath = path.join(PUBLIC_DIR, decodedPath);
    if (fs.existsSync(fullPath)) {
        try {
            const stream = fs.createReadStream(fullPath);
            const asset = await client.assets.upload('image', stream, { filename: path.basename(decodedPath) });
            return asset;
        } catch (e) {
            console.error(`Failed to upload local image ${imagePath}:`, e.message);
            return null;
        }
    } else {
        console.warn(`Image file not found: ${fullPath}`);
        return null; // File missing
    }
};

const migrate = async () => {
    console.log(`Starting migration for ${products.length} products...`);

    for (const p of products) {
        console.log(`Processing ${p.name}...`);

        // Upload Main Image
        const mainImageAsset = await uploadImage(p.image);

        // Upload Gallery Images
        let galleryRefs = [];
        if (p.images && p.images.length > 0) {
            for (const imgPath of p.images) {
                const asset = await uploadImage(imgPath);
                if (asset) {
                    galleryRefs.push({
                        _type: 'image',
                        _key: asset._id, // random key needed for array
                        asset: {
                            _type: 'reference',
                            _ref: asset._id
                        }
                    });
                }
            }
        }

        // Map Colors to object structure
        const colorObjects = (p.colors || []).map(c => ({
            _type: 'object',
            _key: c, // simple key
            hex: c,
            name: 'Color' // Default name since we only have hex
        }));

        const doc = {
            _type: 'product',
            name: p.name,
            slug: {
                _type: 'slug',
                current: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 96) + '-' + Math.random().toString(36).substring(7)
            },
            price: p.price,
            originalPrice: p.originalPrice,
            description: p.description || '',
            category: p.category || 'Accessories',
            type: p.type || getFallbackType(p.category), // Helper
            sizes: p.sizes,
            rating: p.rating,
            reviews: p.reviews,
            mainImage: mainImageAsset ? {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: mainImageAsset._id
                }
            } : undefined,
            images: galleryRefs,
            colors: colorObjects
        };

        try {
            await client.create(doc);
            console.log(`✅ Created: ${p.name}`);
        } catch (err) {
            console.error(`❌ Failed: ${p.name}`, err.message);
        }
    }
    console.log("Migration Complete!");
};

function getFallbackType(category) {
    if (category === 'Men') return 'clothing';
    if (category === 'Women') return 'clothing';
    return 'accessories';
}

migrate();
