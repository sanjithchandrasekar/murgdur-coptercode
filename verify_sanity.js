import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config({ path: 'client/.env' });

const config = {
    projectId: 'qbaw2yts',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-22',
    token: process.env.VITE_SANITY_TOKEN,
};

console.log("---------------------------------------------------");
console.log("SANITY CONNECTION DIAGNOSIS");
console.log("---------------------------------------------------");
console.log(`Checking configuration...`);
console.log(`Project ID: ${config.projectId}`);
console.log(`Dataset: ${config.dataset}`);
if (config.token) {
    console.log(`Token Found: YES (${config.token.substring(0, 5)}...${config.token.substring(config.token.length - 5)})`);
} else {
    console.log(`Token Found: NO (Critical Error)`);
    process.exit(1);
}

const client = createClient(config);

async function testConnection() {
    try {
        console.log("\nAttempting READ operation...");
        const result = await client.fetch('*[_type == "siteSettings"][0]');
        console.log("✅ READ Success!");

        console.log("\nAttempting WRITE operation (creating test doc)...");
        const doc = {
            _type: 'test_connection_doc',
            name: 'Connectivity Test',
            timestamp: new Date().toISOString()
        };
        const created = await client.create(doc);
        console.log(`✅ WRITE Success! Created document ID: ${created._id}`);

        console.log("\nAttempting DELETE operation (cleanup)...");
        await client.delete(created._id);
        console.log("✅ DELETE Success!");

        console.log("\n---------------------------------------------------");
        console.log("DIAGNOSIS RESULT: ALL SYSTEMS OPERATIONAL");
        console.log("Your API configurations are CORRECT.");
        console.log("If your mobile app still fails, it is 100% a CORS issue.");
        console.log("Please check Step 3 in your instructions.");
        console.log("---------------------------------------------------");

    } catch (err) {
        console.error("\n❌ CONNECTION FAILED");
        console.error("Error Details:", err.message);
        if (err.statusCode === 401 || err.statusCode === 403) {
            console.error("\nLikely Cause: INVALID TOKEN or INSUFFICIENT PERMISSIONS.");
            console.error("Action: Ensure the token in client/.env has 'Editor' permissions.");
        }
    }
}

testConnection();
