const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const nodemailer = require('nodemailer');

// Email configuration (optional - can be disabled for development)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function sendStyledEmail(to, subject, html) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('📧 Email not sent (SMTP not configured):', { to, subject });
    return Promise.resolve();
  }
  
  return transporter.sendMail({
    from: process.env.SENDER_EMAIL || process.env.SMTP_USER,
    to,
    subject,
    html,
  }).catch(error => {
    // Log the error but don't crash the server
    console.log('📧 Email sending failed (but continuing):', { to, subject, error: error.message });
    return Promise.resolve(); // Return resolved promise to continue execution
  });
}

// Registration
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  
  if (!name || !email || !password || !role) {
    return res.status(400).json({ 
      success: false, 
      message: 'Missing required fields' 
    });
  }

  // Validate role
  if (!['admin', 'teacher', 'student'].includes(role)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid role. Must be admin, teacher, or student' 
    });
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ 
      where: { email } 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({ 
      data: { 
        name, 
        email, 
        password: hashedPassword, 
        role,
        isActive: true
      } 
    });

    // Send welcome email (fire-and-forget)
    setImmediate(() => {
      sendStyledEmail(
      email, 
      'Welcome to ERP System', 
      `<div style='font-family:sans-serif'>
        <h2>Welcome, ${name}!</h2>
        <p>Thank you for registering as a <b>${role}</b>.</p>
        <p>You can now login to your account.</p>
      </div>`
      );
    });

    res.status(201).json({ 
      success: true, 
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;
  
  if (!email || !password || !role) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email, password, and role are required' 
    });
  }

  try {
    // Find user by email
    const user = await prisma.user.findUnique({ 
      where: { email } 
    });

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({ 
        success: false, 
        message: 'Account is deactivated. Please contact administrator.' 
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Check role
    if (user.role !== role) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid role for this account' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role 
      }, 
      process.env.JWT_SECRET || 'your-secret-key', 
      { expiresIn: '7d' }
    );

    // Send login notification (fire-and-forget)
    setImmediate(() => {
      sendStyledEmail(
      email, 
      'Login Notification', 
      `<div style='font-family:sans-serif'>
        <h2>Login Alert</h2>
        <p>You have logged in as <b>${role}</b> at ${new Date().toLocaleString()}.</p>
      </div>`
      );
    });

    res.json({ 
      success: true, 
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Get current user profile
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await prisma.user.findUnique({ 
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({ 
      success: true, 
      user 
    });
  } catch (err) {
    console.error('Profile error:', err);
    res.status(401).json({ 
      success: false, 
      message: 'Invalid token' 
    });
  }
});

// Password Reset (request)
router.post('/send-reset-otp', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email is required' 
    });
  }

  try {
    const user = await prisma.user.findUnique({ 
      where: { email } 
    });
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Generate OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const otpExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

    // Save OTP to database
    await prisma.user.update({ 
      where: { email }, 
      data: { 
        resetOtp: otp, 
        resetOtpExpireAt: otpExpiry 
      } 
    });

    // Send OTP email (fire-and-forget)
    setImmediate(() => {
      sendStyledEmail(
      email, 
      'Password Reset OTP', 
      `<div style='font-family:sans-serif'>
        <h2>Password Reset</h2>
        <p>Your OTP is <b>${otp}</b>.</p>
        <p>It is valid for 15 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>`
      );
    });

    res.json({ 
      success: true, 
      message: 'OTP sent to your email' 
    });
  } catch (err) {
    console.error('Send OTP error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Password Reset (verify and set new password)
router.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;
  
  if (!email || !otp || !newPassword) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email, OTP, and new password are required' 
    });
  }

  try {
    const user = await prisma.user.findUnique({ 
      where: { email } 
    });
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Check OTP validity
    if (user.resetOtp !== otp || user.resetOtpExpireAt < Date.now()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid or expired OTP' 
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear OTP
    await prisma.user.update({ 
      where: { email }, 
      data: { 
        password: hashedPassword, 
        resetOtp: null, 
        resetOtpExpireAt: null 
      } 
    });

    // Send confirmation email (fire-and-forget)
    setImmediate(() => {
      sendStyledEmail(
      email, 
      'Password Reset Successful', 
      `<div style='font-family:sans-serif'>
        <h2>Password Reset</h2>
        <p>Your password has been reset successfully.</p>
        <p>You can now login with your new password.</p>
      </div>`
      );
    });

    res.json({ 
      success: true, 
      message: 'Password reset successfully' 
    });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Logout (client-side token removal)
router.post('/logout', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (token) {
      // In a real application, you might want to blacklist the token
      // For now, we'll just return success
      console.log('User logged out:', token);
    }

    res.json({ 
      success: true, 
      message: 'Logged out successfully' 
    });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

module.exports = router;