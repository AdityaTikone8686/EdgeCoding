export default async function verifyOtp(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ message: "Email and OTP are required" });

  const db = req.app.locals.db;

  try {
    const record = await db.collection("otps").findOne({ email });
    if (!record) return res.status(400).json({ message: "No OTP found for this email" });

    if (record.expiresAt < Date.now()) return res.status(400).json({ message: "OTP expired" });
    if (record.otp !== code) return res.status(400).json({ message: "Invalid OTP" });

    // OTP verified → remove from DB
    await db.collection("otps").deleteOne({ email });

    res.status(200).json({ success: true, message: "OTP verified" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

