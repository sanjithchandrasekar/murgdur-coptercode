const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    addressLine1: { type: String, required: true },
    addressLine2: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, default: 'India' },
    isDefault: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    mobile: {
        type: String,
        // required: [true, 'Please add a mobile number'] // Optional depending on flow, but good to have
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    addresses: [addressSchema], // Store multiple addresses
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' // Reference to Sanity ID or local generic ID? Sanity IDs are strings.
        // If referencing Sanity, just use String type.
    }],
    sanityId: {
        type: String, // To link with Sanity if needed
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
