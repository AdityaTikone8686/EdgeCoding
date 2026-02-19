// send-otp.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });

  // Example transporter using Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // set in Vercel
      pass: process.env.EMAIL_PASS
    }
  });

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${code}`
    });
    return res.status(200).json({ success: true, code });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Email sending failed' });
  }
}

