import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

let client;
let clientPromise;

if (!uri) {
  throw new Error("Please add MONGODB_URI to Vercel Environment Variables");
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://edge-coding.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const client = await clientPromise;
    const db = client.db(dbName);

    const record = await db.collection("otps").findOne({ email });

    if (!record) {
      return res.status(404).json({ message: "No OTP found" });
    }

    if (record.expiresAt < Date.now()) {
      return res.status(410).json({ message: "OTP expired" });
    }

    if (record.otp !== code) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    // ✅ OTP valid — delete it
    await db.collection("otps").deleteOne({ email });

    // ✅ Mark user as verified
    await db.collection("users").updateOne(
      { email },
      { $set: { isVerified: true } }
    );

    // 📧 Send Welcome Email
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
      subject: "Welcome to Edge Coding 🎉",
      html: `
        <h2>Welcome to Edge Coding!</h2>
        <p>Your account has been successfully verified.</p>
        <p>You can now login using your email and password.</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "OTP verified",
    });

  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
