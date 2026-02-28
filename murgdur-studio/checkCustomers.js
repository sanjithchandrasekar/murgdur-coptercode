import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'qbaw2yts',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-22',
});

async function checkCustomers() {
    try {
        const query = '*[_type == "customer"]';
        const customers = await client.fetch(query);

        console.log(`\n--- SANITY DATABASE STATUS ---`);
        console.log(`Found ${customers.length} customer records in the CLOUD database.`);

        if (customers.length > 0) {
            console.log("\nRecent Customers:");
            customers.forEach(c => {
                console.log(`- Name: ${c.firstName} ${c.lastName}`);
                console.log(`  Email: ${c.email}`);
                console.log(`  ID: ${c._id}`);
                console.log(`  Created: ${c.createdAt}`);
                console.log('---');
            });
        }
    } catch (error) {
        console.error("Error fetching customers:", error.message);
    }
}

checkCustomers();
