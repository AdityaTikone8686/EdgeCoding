import express from "express";

const router = express.Router();
const otpStore = {}; // same in-memory store; ideally share with send-otp.js

router.post("/", (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ success: false, message: "Email and OTP required" });

  if (otpStore[email] === code) {
    delete otpStore[email]; // OTP consumed
    return res.json({ success: true, message: "OTP verified" });
  } else {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }
});

export default router;
