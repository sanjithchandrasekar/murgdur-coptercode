import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONFIGURATION
const PROJECT_ID = 'qbaw2yts';
const DATASET = 'production';
const TOKEN = "skhKjccyqXjuBAOwCUYHvUXFMKSrgbVlfIIQR0pPDsUGsyTYj3UGRlaWTsn6D8RpKcZ9N4ot6VHw82CEGClEpISRlgXsYqsdHLGue9NKmhDQ3N6DySir23xyLwa7AFLUcxX1S8cGphK03p2vEpynuI0yZhkHf98AS8E8XmUHyKI6R0d9wHNL";

const client = createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    token: TOKEN,
    useCdn: false,
    apiVersion: '2024-01-22',
});

async function uploadImage(filePath) {
    try {
        console.log(`Uploading image from ${filePath}...`);
        const buffer = fs.readFileSync(filePath);
        const asset = await client.assets.upload('image', buffer, {
            filename: path.basename(filePath)
        });
        console.log(`Image uploaded: ${asset._id}`);
        return asset._id;
    } catch (error) {
        console.error('Image upload failed:', error.message);
        return null;
    }
}

async function createSiteSettings() {
    console.log("Checking for existing site settings...");

    // Upload Logo
    const logoPath = path.join(__dirname, 'client/public/images/logo.jpeg');
    let logoAssetId = null;

    console.log(`Looking for logo at: ${logoPath}`);

    if (fs.existsSync(logoPath)) {
        logoAssetId = await uploadImage(logoPath);
    } else {
        console.warn(`Logo file not found at ${logoPath}`);
    }

    const doc = {
        _id: 'siteSettings', // Use a fixed ID to be a singleton
        _type: 'siteSettings',
        title: 'MURGDUR',
        contactEmail: 'care@murgdur.com',
        contactPhone: '+91 98765 43210',
        ...(logoAssetId && {
            logo: {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: logoAssetId
                }
            }
        })
    };

    try {
        // createOrReplace ensures we don't duplicate and can update if it exists but is partial
        const result = await client.createOrReplace(doc);
        console.log(`✅ Success! Site Settings document created/updated (ID: ${result._id})`);
        console.log("Title: " + result.title);
    } catch (err) {
        console.error("❌ Failed to create document:", err.message);
    }
}

createSiteSettings();
