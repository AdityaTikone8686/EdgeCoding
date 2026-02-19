import { connectToDB } from "./mongodb.js";

export default async function handler(req, res) {
  try {
    if (req.method === "OPTIONS") return res.status(200).end();
    if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ message: "Email and OTP are required" });

    const { db } = await connectToDB();

    const record = await db.collection("otps").findOne({ email });
    if (!record) return res.status(400).json({ message: "No OTP found for this email" });

    if (record.expiresAt < Date.now()) return res.status(400).json({ message: "OTP expired" });
    if (record.otp !== code) return res.status(400).json({ message: "Invalid OTP" });

    await db.collection("otps").deleteOne({ email });

    return res.status(200).json({ success: true, message: "OTP verified" });
  } catch (err) {
    console.error("VERIFY OTP ERROR:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
