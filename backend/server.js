// server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const otpStore = {}; // { email: { otp: "123456", expires: Date } }

/* ── Send OTP ── */
app.post("/api/send-otp", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, error: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  const expires = Date.now() + 5 * 60 * 1000; // 5 minutes expiry

  otpStore[email] = { otp, expires };
  console.log(`OTP for ${email}: ${otp}`); // log OTP for demo

  // TODO: send email via nodemailer or any email service

  res.json({ success: true });
});

/* ── Verify OTP ── */
app.post("/api/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ success: false, error: "Email and OTP required" });

  const record = otpStore[email];
  if (!record) return res.status(400).json({ success: false, error: "No OTP sent to this email" });
  if (Date.now() > record.expires) return res.status(400).json({ success: false, error: "OTP expired" });
  if (record.otp !== otp) return res.status(400).json({ success: false, error: "Invalid OTP" });

  delete otpStore[email]; // OTP used, remove it
  res.json({ success: true });
});

/* ── Start Server ── */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
