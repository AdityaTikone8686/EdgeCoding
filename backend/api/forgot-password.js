import { MongoClient } from "mongodb";
import crypto from "crypto";
import nodemailer from "nodemailer";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default async function handler(req, res) {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*"); // or your frontend URL
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  res.setHeader("Access-Control-Allow-Origin", "*"); // again for POST response

  try {
    const { email } = req.body;

    const client = await clientPromise;
    const db = client.db(dbName);

    const user = await db.collection("users").findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = Date.now() + 15 * 60 * 1000;

    await db.collection("users").updateOne(
      { email },
      { $set: { resetToken, resetExpires: expiresAt } }
    );

    const resetLink = `https://edge-coding.vercel.app/reset-password?token=${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password",
      html: `<h2>Password Reset</h2>
             <p>Click below to reset your password:</p>
             <a href="${resetLink}">${resetLink}</a>
             <p>This link expires in 15 minutes.</p>`,
    });

    return res.status(200).json({ message: "Reset link sent" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
