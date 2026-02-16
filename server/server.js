const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Middleware to ensure Database Connection for every request (Critical for Vercel/Serverless)
app.use(async (req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    return next();
  }
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    res
      .status(500)
      .json({ error: "Database Request Failed: Connection Error" });
  }
});

// Routes
app.get("/", (req, res) => {
  res.send("Luxuria API is running...");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// Test Route to Verify DB Connection & Create a Dummy User
app.get("/api/test-db", async (req, res) => {
  try {
    const User = require("./models/User");

    // Check if any user exists
    const count = await User.countDocuments();

    let message = `Database Connected! Total Users: ${count}`;
    let user = null;

    // If no users, create a temporary test user to show in the "table"
    if (count === 0) {
      user = await User.create({
        name: "Test Royal User",
        email: "test@luxuria.com",
        password: "password123", // In real app, hash this!
        role: "user",
      });
      message += ". Created a test user request to view in Atlas.";
    } else {
      user = await User.findOne();
      message += ". Found existing users.";
    }

    res.json({
      success: true,
      message,
      sampleData: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () =>
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
    ),
  );
}

module.exports = app;
