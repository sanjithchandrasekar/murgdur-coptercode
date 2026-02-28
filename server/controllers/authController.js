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

// @desc    Forgot Password - Send reset email
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if user exists - still return success
      return res.json({ message: "If that email is registered, a reset link has been sent." });
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = tokenHash;
    user.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL || "https://murugdur1.vercel.app"}/auth?mode=reset&token=${resetToken}`;

    const htmlEmail = `
      <div style="font-family: 'Georgia', serif; background: #0a0a0a; color: #fff; padding: 0; margin: 0;">
        <div style="max-width: 520px; margin: auto; background: #111; border: 1px solid #D4AF37;">
          <div style="background: #D4AF37; padding: 20px 32px; text-align: center;">
            <h1 style="margin: 0; color: #000; font-size: 22px; letter-spacing: 6px; text-transform: uppercase; font-weight: 700;">MURGDUR</h1>
            <p style="margin: 4px 0 0; color: #000; font-size: 10px; letter-spacing: 4px; text-transform: uppercase;">The Royal Heritage</p>
          </div>
          <div style="padding: 40px 32px;">
            <h2 style="color: #D4AF37; letter-spacing: 3px; text-transform: uppercase; font-size: 16px; margin-top: 0;">Password Reset Request</h2>
            <p style="color: #ccc; line-height: 1.7; font-size: 15px;">We received a request to reset the password for your Murgdur account associated with <strong style="color:#fff">${email}</strong>.</p>
            <p style="color: #ccc; line-height: 1.7; font-size: 15px;">Click the button below to set a new password. This link expires in <strong style="color:#D4AF37">30 minutes</strong>.</p>
            <div style="text-align: center; margin: 36px 0;">
              <a href="${resetUrl}" style="background: #D4AF37; color: #000; text-decoration: none; padding: 14px 36px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; font-size: 13px; display: inline-block;">Reset My Password</a>
            </div>
            <p style="color: #888; font-size: 12px; line-height: 1.6;">If you did not request this, please ignore this email. Your password will remain unchanged.</p>
            <hr style="border: none; border-top: 1px solid #333; margin: 28px 0;" />
            <p style="color: #555; font-size: 11px;">Or copy this link: <span style="color: #D4AF37; word-break: break-all;">${resetUrl}</span></p>
          </div>
          <div style="background: #0a0a0a; padding: 16px 32px; text-align: center;">
            <p style="color: #555; font-size: 11px; margin: 0; letter-spacing: 2px; text-transform: uppercase;">© 2025 Murgdur. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    `;

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: process.env.SMTP_PORT || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Murgdur Royal Concierge" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Reset Your Murgdur Password",
        html: htmlEmail,
      });

      console.log(`[RESET] Email sent to ${email}`);
    } catch (emailErr) {
      console.error("Reset email sending failed:", emailErr);
      // Clear token on failure
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return res.status(500).json({ message: "Failed to send reset email. Please try again." });
    }

    res.json({ message: "If that email is registered, a reset link has been sent." });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Reset Password using token
// @route   POST /api/auth/reset-password/:token
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: tokenHash,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token. Please request a new one." });
    }

    user.password = password; // In production use bcrypt
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({
      message: "Password reset successfully. You can now log in.",
      token: generateToken(user._id),
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  googleLogin,
  sendOTP,
  updateUserAddresses,
  forgotPassword,
  resetPassword,
};
