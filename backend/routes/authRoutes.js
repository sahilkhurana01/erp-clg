const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function sendStyledEmail(to, subject, html) {
  return transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to,
    subject,
    html,
  });
}

// Registration
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) return res.status(400).json({ success: false, message: 'Missing fields' });
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.json({ success: false, message: 'User already exists' });
    const user = await prisma.user.create({ data: { name, email, password, role } });
    // Send verification email (styled)
    await sendStyledEmail(email, 'Verify your account', `<div style='font-family:sans-serif'><h2>Welcome, ${name}!</h2><p>Thank you for registering as a <b>${role}</b>.<br>Please verify your email to activate your account.</p></div>`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) return res.status(400).json({ success: false, message: 'Missing fields' });
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password || user.role !== role) return res.json({ success: false, message: 'Invalid credentials or role' });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    // Send login notification (styled)
    await sendStyledEmail(email, 'Login Notification', `<div style='font-family:sans-serif'><h2>Login Alert</h2><p>You have logged in as <b>${role}</b> at ${new Date().toLocaleString()}.</p></div>`);
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Password Reset (request)
router.post('/send-reset-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email required' });
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.json({ success: false, message: 'User not found' });
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    await prisma.user.update({ where: { email }, data: { resetOtp: otp, resetOtpExpireAt: Date.now() + 15 * 60 * 1000 } });
    await sendStyledEmail(email, 'Password Reset OTP', `<div style='font-family:sans-serif'><h2>Password Reset</h2><p>Your OTP is <b>${otp}</b>. It is valid for 15 minutes.</p></div>`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Password Reset (verify and set new password)
router.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) return res.status(400).json({ success: false, message: 'Missing fields' });
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.resetOtp !== otp || user.resetOtpExpireAt < Date.now()) return res.json({ success: false, message: 'Invalid or expired OTP' });
    await prisma.user.update({ where: { email }, data: { password: newPassword, resetOtp: '', resetOtpExpireAt: 0 } });
    await sendStyledEmail(email, 'Password Reset Successful', `<div style='font-family:sans-serif'><h2>Password Reset</h2><p>Your password has been reset successfully.</p></div>`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;