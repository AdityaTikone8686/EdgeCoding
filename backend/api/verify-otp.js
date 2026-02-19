import otpStore from "./otpStore";

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://edge-coding.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ message: "Email and code are required" });

  const record = otpStore[email];
  if (!record) return res.status(400).json({ message: "No OTP found" });
  if (Date.now() > record.expires) {
    delete otpStore[email];
    return res.status(400).json({ message: "OTP expired" });
  }
  if (record.code !== code) return res.status(400).json({ message: "Invalid OTP" });

  delete otpStore[email];
  res.status(200).json({ success: true, message: "OTP verified" });
}
