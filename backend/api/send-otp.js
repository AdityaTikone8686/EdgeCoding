import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save OTP in-memory (for demo purposes; replace with DB in production)
    // Vercel serverless functions are stateless, so ideally store OTP in DB or in-memory cache
    // For demo, we return OTP (not for production!)
    console.log(`OTP for ${email}: ${otp}`);

    // Optional: send email with nodemailer (requires environment vars for email account)
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    // });
    // await transporter.sendMail({
    //   from: process.env.EMAIL_USER,
    //   to: email,
    //   subject: "Your Verification Code",
    //   text: `Your OTP is ${otp}`
    // });

    return res.status(200).json({ success: true, message: "OTP sent", otp });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
