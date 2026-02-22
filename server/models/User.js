const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  id: String,
  name: String,
  mobile: String,
  addressLine: String,
  city: { type: String },
  state: { type: String },
  pincode: { type: String },
  country: { type: String, default: "India" },
  type: { type: String, default: "Home" },
  address: String, // Full formatted string
  isDefault: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  mobile: {
    type: String,
    // required: [true, 'Please add a mobile number'] // Optional depending on flow, but good to have
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isMember: {
    type: Boolean,
    default: true,
  },
  tier: {
    type: String,
    enum: ["Member", "Silver", "Gold", "Platinum", "Royal"],
    default: "Member",
  },
  addresses: [addressSchema], // Store multiple addresses
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Reference to Sanity ID or local generic ID? Sanity IDs are strings.
      // If referencing Sanity, just use String type.
    },
  ],
  sanityId: {
    type: String, // To link with Sanity if needed
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
