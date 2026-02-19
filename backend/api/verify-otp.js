// api/verify-otp.js
import otpStore from "./otpStore.js"; // make sure the path is correct

export default function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "https://edge-coding.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight request
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ message: "Email and code are required" });

    const record = otpStore[email];
    if (!record) return res.status(400).json({ success: false, message: "No OTP found for this email" });

    if (Date.now() > record.expires) {
      delete otpStore[email];
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    if (code !== record.code) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // OTP is correct
    delete otpStore[email]; // remove OTP once verified
    return res.status(200).json({ success: true, message: "OTP verified" });

  } catch (err) {
    console.error("verify-otp error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

