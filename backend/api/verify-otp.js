// Simple in-memory OTP store (shared with send-otp)
const otpStore = {};

/**
 * POST /api/verify-otp
 * Body: { email: string, code: string }
 */
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ success: false, message: 'Email and OTP code are required' });
  }

  // Check if OTP matches
  if (otpStore[email] && otpStore[email] === code) {
    // OTP is correct, remove it after verification
    delete otpStore[email];
    return res.status(200).json({ success: true, message: 'OTP verified successfully' });
  }

  // OTP invalid
  return res.status(400).json({ success: false, message: 'Invalid OTP' });
}
