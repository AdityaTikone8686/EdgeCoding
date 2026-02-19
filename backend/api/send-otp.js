// api/send-otp.js
import nodemailer from "nodemailer";
import { connectToDB } from "./mongodb.js";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(200).end(); // CORS preflight
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const { db } = await connectToDB();

    await db.collection("otps").updateOne(
      { email },
      { $set: { otp, expiresAt: Date.now() + parseInt(process.env.OTP_EXPIRY) * 1000 } },
      { upsert: true }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}. It expires in ${process.env.OTP_EXPIRY / 60} minutes.`,
    });

    res.status(200).json({ success: true, message: "OTP sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}


