const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Temporary in-memory store for OTPs (Use Redis in production)
const otpStore = new Map();

// Helper: Send Email
const sendEmail = async (to, subject, text) => {
  let transporter;

  if (process.env.SMTP_HOST && process.env.SMTP_USER && !process.env.SMTP_USER.includes("YOUR_")) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else if (process.env.SMTP_USER && process.env.SMTP_USER.includes("YOUR_")) {
    console.error("CRITICAL: You must configure server/.env with real Gmail credentials!");
    throw new Error("Server Email Configuration Missing. Please check .env file.");
  } else {
    // Fallback to Ethereal for testing
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.log("Using Ethereal Mail (Test Account)");
  }

  const info = await transporter.sendMail({
    from: '"Murgdur Royal Concierge" <concierge@murgdur.com>',
    to,
    subject,
    text,
    html: `<div style="font-family: serif; color: #000; padding: 20px; border: 1px solid #D4AF37;">
             <h2 style="color: #D4AF37; text-transform: uppercase;">Royal Verification</h2>
             <p>Your verification code is:</p>
             <h1 style="letter-spacing: 5px;">${text}</h1>
             <p>Use this code to complete your registration. Valid for 10 minutes.</p>
           </div>`,
  });

  if (!process.env.SMTP_HOST) {
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
  return info;
};

// @desc    Send OTP to Email
// @route   POST /api/auth/send-otp
// @access  Public
const sendOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "Email already registered" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = Date.now() + 10 * 60 * 1000; // 10 mins

  otpStore.set(email, { otp, expires });

  // Always log OTP in dev/test for convenience
  console.log(`[OTP DEBUG] Code for ${email}: ${otp}`);

  try {
    await sendEmail(email, "Your Verification Code - Murgdur", otp);
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Email sending failed:", error);

    // If email fails, return 500
    res.status(500).json({ message: "Failed to send verification email. Please try again later." });
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password, // Note: In production, hash this password using bcrypt
      mobile,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        isMember: user.isMember,
        tier: user.tier,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email }).select("+password");

    if (user && user.password === password) {
      // Note: Use bcrypt.compare in production
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        isMember: user.isMember,
        tier: user.tier,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Google Login
// @route   POST /api/auth/google
// @access  Public
const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    // Verify the token audience first to prevent Confused Deputy attacks
    const tokenInfoRes = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`);

    if (!tokenInfoRes.ok) {
      throw new Error("Invalid access token");
    }

    const tokenInfo = await tokenInfoRes.json();

    if (tokenInfo.aud !== process.env.GOOGLE_CLIENT_ID) {
      throw new Error("Invalid token audience");
    }

    // Fetch user info from Google using the access token
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data from Google");
    }

    const { name, email, picture, sub: googleId } = await response.json();

    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      user = await User.create({
        name,
        email,
        password: randomPassword, // In production, hash this
        mobile: "", // Google doesn't provide mobile usually
        isMember: true, // Default to member? Or maybe follow registration logic
        tier: "Silver",
      });
    }

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      isMember: user.isMember,
      tier: user.tier,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(400).json({ message: "Google authentication failed" });
  }
};

// @desc    Update user addresses in MongoDB
// @route   PUT /api/auth/update-addresses
// @access  Public
const updateUserAddresses = async (req, res) => {
  try {
    const { userId, addresses } = req.body;

    if (!userId || !addresses) {
      return res.status(400).json({ message: "User ID and addresses are required" });
    }

    const user = await User.findById(userId);

    if (user) {
      user.addresses = addresses;
      await user.save();
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        addresses: user.addresses,
        isMember: user.isMember,
        tier: user.tier,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Update Address Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  googleLogin,
  sendOTP,
  updateUserAddresses,
};
