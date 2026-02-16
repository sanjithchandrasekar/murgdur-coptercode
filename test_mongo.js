const mongoose = require('mongoose');

const uri = "mongodb+srv://sanjithchandrasekar03_db:sanjithkongu44@cluster0.gvi5jmk.mongodb.net/luxuria?appName=Cluster0";

async function testConnection() {
    try {
        console.log("Connecting to MongoDB Atlas...");
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("SUCCESS: Connected to MongoDB Atlas!");

        const testSchema = new mongoose.Schema({ name: String });
        const TestModel = mongoose.model('ConnectionTest', testSchema);

        const count = await TestModel.countDocuments();
        console.log(`Document count in ConnectionTest collection: ${count}`);

        console.log("Connection verified.");
        process.exit(0);
    } catch (err) {
        console.error("FAILURE: Could not connect to MongoDB Atlas.");
        console.error(err);
        process.exit(1);
    }
}

testConnection();
