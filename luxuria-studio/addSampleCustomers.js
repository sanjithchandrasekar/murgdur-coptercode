import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'qbaw2yts',
    dataset: 'production',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN || '', // Will use public write access
    apiVersion: '2024-01-22',
});

const sampleCustomers = [
    {
        _type: 'customer',
        firstName: 'Rajesh',
        lastName: 'Kumar',
        mobile: '9876543210',
        email: 'rajesh.kumar@example.com',
        password: 'Royal@123',
        addressLine1: '12, MG Road, Connaught Place',
        addressLine2: 'Near India Gate',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110001',
        createdAt: new Date().toISOString()
    },
    {
        _type: 'customer',
        firstName: 'Priya',
        lastName: 'Sharma',
        mobile: '9123456789',
        email: 'priya.sharma@example.com',
        password: 'Luxury@456',
        addressLine1: '45, Brigade Road',
        addressLine2: 'Ashok Nagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560001',
        createdAt: new Date().toISOString()
    },
    {
        _type: 'customer',
        firstName: 'Amit',
        lastName: 'Patel',
        mobile: '9988776655',
        email: 'amit.patel@example.com',
        password: 'Heritage@789',
        addressLine1: '78, Marine Drive',
        addressLine2: 'Nariman Point',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400021',
        createdAt: new Date().toISOString()
    },
    {
        _type: 'customer',
        firstName: 'Sneha',
        lastName: 'Reddy',
        mobile: '9445566778',
        email: 'sneha.reddy@example.com',
        password: 'Elite@2024',
        addressLine1: '23, Jubilee Hills',
        addressLine2: 'Road No. 45',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500033',
        createdAt: new Date().toISOString()
    },
    {
        _type: 'customer',
        firstName: 'Vikram',
        lastName: 'Singh',
        mobile: '9556677889',
        email: 'vikram.singh@example.com',
        password: 'Royal@Crown',
        addressLine1: '56, Park Street',
        addressLine2: 'Near Victoria Memorial',
        city: 'Kolkata',
        state: 'West Bengal',
        pincode: '700016',
        createdAt: new Date().toISOString()
    }
];

async function addCustomers() {
    try {
        console.log('🚀 Starting to add sample customers...\n');

        for (const customer of sampleCustomers) {
            const result = await client.create(customer);
            console.log(`✅ Added: ${customer.firstName} ${customer.lastName} (${customer.email})`);
        }

        console.log('\n🎉 Successfully added all sample customers to Sanity!');
        console.log('👉 Refresh your Sanity Studio to see the new customers.');
    } catch (error) {
        console.error('❌ Error adding customers:', error);
    }
}

addCustomers();
