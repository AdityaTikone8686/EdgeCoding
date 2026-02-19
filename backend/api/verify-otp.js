import { otpStore } from "./send-otp";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ success: false, message: "Method not allowed" });

  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ success: false, message: "Email and OTP code are required" });

  const record = otpStore[email];
  if (!record) return res.status(400).json({ success: false, message: "No OTP found. Please request again." });
  if (record.expires < Date.now()) {
    delete otpStore[email];
    return res.status(400).json({ success: false, message: "OTP expired. Please request again." });
  }

  if (record.otp !== code) return res.status(400).json({ success: false, message: "Invalid OTP" });

  // OTP correct, remove from store
  delete otpStore[email];

  return res.status(200).json({ success: true, message: "OTP verified successfully" });
}
