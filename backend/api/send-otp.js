// api/send-otp.js
import { MongoClient } from "mongodb";

let cachedClient = null;

export default async function handler(req, res) {
  // ✅ CORS headers FIRST (before anything else)
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
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.DB_NAME;

    if (!uri || !dbName) {
      return res.status(500).json({ message: "Environment variables not set" });
    }

    if (!cachedClient) {
      cachedClient = new MongoClient(uri);
      await cachedClient.connect();
    }

    const db = cachedClient.db(dbName);

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await db.collection("otps").updateOne(
      { email },
      {
        $set: {
          otp,
          expiresAt: Date.now() + 5 * 60 * 1000
        }
      },
      { upsert: true }
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("SEND OTP ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
