// api/send-otp.js
import { MongoClient } from "mongodb";

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
  // 🔥 CORS HEADERS
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
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const client = await clientPromise;
    const db = client.db(dbName);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await db.collection("otps").updateOne(
      { email },
      {
        $set: {
          otp,
          expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
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
