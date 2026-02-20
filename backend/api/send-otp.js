// api/send-otp.js
import express from "express";
import nodemailer from "nodemailer";
import { connectToDB } from "../mongodb.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ message: "Email is required" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const { db } = await connectToDB();

    await db.collection("otps").updateOne(
      { email },
      { $set: { otp, expiresAt: Date.now() + 5 * 60 * 1000 } },
      { upsert: true }
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("SEND OTP ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;


