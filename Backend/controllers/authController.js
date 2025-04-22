const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOtpEmail } = require('../utils/sendOtp');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ detail: 'User already exists' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const user = new User({ name, email, password, otp, otpExpires: Date.now() + 10 * 60000 });
    await user.save();

    await sendOtpEmail(email, otp);

    res.status(201).json({ message: 'OTP sent to email' });
  } catch (error) {
    res.status(500).json({ detail: 'Signup failed', error });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
    return res.status(400).json({ detail: 'Invalid or expired OTP' });
  }

  user.otp = null;
  user.otpExpires = null;
  await user.save();

  res.json({ message: 'Email verified successfully' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ detail: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token, user: { name: user.name, email: user.email } });
};

exports.sendResetOtp = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ detail: 'User not found' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpires = Date.now() + 10 * 60000;
  await user.save();

  await sendOtpEmail(email, otp);
  res.json({ message: 'Reset OTP sent to email' });
};

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
    return res.status(400).json({ detail: 'Invalid or expired OTP' });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  res.json({ message: 'Password reset successful' });
};
