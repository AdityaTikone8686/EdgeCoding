import express from "express";
import { connectToDB } from "../mongodb.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code)
      return res.status(400).json({ message: "Email and OTP are required" });

    const { db } = await connectToDB();

    const record = await db.collection("otps").findOne({ email });
    if (!record)
      return res.status(404).json({ message: "OTP not found" });

    if (record.expiresAt < Date.now())
      return res.status(410).json({ message: "OTP expired" });

    if (record.otp !== code)
      return res.status(401).json({ message: "Invalid OTP" });

    await db.collection("otps").deleteOne({ email });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("VERIFY OTP ERROR:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
