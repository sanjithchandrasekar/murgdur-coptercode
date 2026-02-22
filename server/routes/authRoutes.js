const express = require("express");
const router = express.Router();
const { registerUser, loginUser, googleLogin, sendOTP, updateUserAddresses } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleLogin);
router.post("/send-otp", sendOTP);
router.put("/update-addresses", updateUserAddresses);

module.exports = router;
