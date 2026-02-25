const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const uri = "mongodb+srv://sanjithchandrasekar03_db:sanjithkongu44@cluster0.gvi5jmk.mongodb.net/luxuria?appName=Cluster0";

async function inspectDb() {
    try {
        console.log("Connecting to MongoDB Atlas...");
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("Connected Successfully.");

        const db = mongoose.connection.db;

        // List all collections
        const collections = await db.listCollections().toArray();
        console.log("--- Collections inside database ---");
        if (collections.length === 0) {
            console.log("No collections found.");
        }

        for (const coll of collections) {
            const collName = coll.name;
            const count = await db.collection(collName).countDocuments();
            console.log(`- ${collName}: ${count} document(s)`);
            if (count > 0) {
                // Fetch one sample document
                const sample = await db.collection(collName).findOne();
                console.log(`  Sample Document from ${collName}:`, JSON.stringify(sample, null, 2));
            }
        }

        console.log("Inspection complete.");
        process.exit(0);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

inspectDb();
