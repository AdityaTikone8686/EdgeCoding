// api/verify-otp.js
import otpStore from "./otpStore.js";

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://edge-coding.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ message: "Email and OTP are required" });

    const record = otpStore[email];
    if (!record) return res.status(400).json({ message: "OTP not found. Please request a new one." });

    if (Date.now() > record.expires) {
      delete otpStore[email];
      return res.status(400).json({ message: "OTP expired. Please request a new one." });
    }

    if (record.code !== code) return res.status(400).json({ message: "Invalid OTP" });

    // OTP verified
    delete otpStore[email];
    return res.status(200).json({ success: true, message: "OTP verified" });
  } catch (err) {
    console.error("verify-otp error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
