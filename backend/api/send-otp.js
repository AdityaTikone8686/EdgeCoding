import nodemailer from "nodemailer";

// Temporary in-memory store for OTPs
const otpStore = {};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ success: false, message: "Method not allowed" });

  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: "Email is required" });

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Store OTP in memory with expiry (5 mins)
  otpStore[email] = { otp: otp.toString(), expires: Date.now() + 5 * 60 * 1000 };

  // Create nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // use your SMTP provider
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"CodeQuest" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
      html: `<p>Your OTP code is <strong>${otp}</strong></p>`,
    });

    console.log(`OTP for ${email}: ${otp}`);

    return res.status(200).json({ success: true, message: "OTP sent" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Failed to send email" });
  }
}

// Export otpStore for verify-otp to use
export { otpStore };

