import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

const client = new MongoClient(process.env.MONGODB_URI);

let clientPromise = client.connect();

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ message: "Missing token or password" });

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const user = await db.collection("users").findOne({ resetToken: token });
    if (!user) return res.status(400).json({ message: "Invalid token" });
    if (Date.now() > user.resetExpires) return res.status(400).json({ message: "Token expired" });

    const hashed = await bcrypt.hash(password, 10);

    await db.collection("users").updateOne(
      { resetToken: token },
      { $set: { password: hashed }, $unset: { resetToken: "", resetExpires: "" } }
    );

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
