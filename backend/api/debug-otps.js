import { connectToDB } from "./mongodb.js";

export default async function handler(req, res) {
  try {
    // Only allow GET for debugging
    if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });

    const { db } = await connectToDB();
    const otps = await db.collection("otps").find({}).toArray();

    return res.status(200).json({ otps });
  } catch (err) {
    console.error("DEBUG OTP ERROR:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
