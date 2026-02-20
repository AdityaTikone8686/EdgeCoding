// api/send-otp.js
import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

let cachedClient = global._mongoClient;
let cachedDb = global._mongoDb;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db(dbName);

  global._mongoClient = client;
  global._mongoDb = db;

  return { client, db };
}

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
    if (!uri || !dbName) {
      return res.status(500).json({ message: "Environment variables missing" });
    }

    const { db } = await connectToDatabase();
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP in DB
    await db.collection("otps").updateOne(
      { email },
      {
        $set: {
          otp,
          expiresAt: Date.now() + 5 * 60 * 1000,
        },
      },
      { upsert: true }
    );

    // ✅ Send Email
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
      subject: "Your Verification Code",
      html: `
        <h2>Your OTP Code</h2>
        <p>Your verification code is:</p>
        <h1>${otp}</h1>
        <p>This OTP expires in 5 minutes.</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("SEND OTP ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
}
