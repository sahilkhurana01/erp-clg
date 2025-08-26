const jwt = require('jsonwebtoken');
const { connectMongo } = require('../db');
const User = require('../models/User');

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    await connectMongo();
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    // Get user from database
    const user = await User.findById(decoded.id).select('name email role isActive');

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    if (!user.isActive) {
      return res.status(401).json({ success: false, message: 'Account is deactivated' });
    }

    // Add user info to request
    req.user = { id: String(user._id), name: user.name, email: user.email, role: user.role, isActive: user.isActive };
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired' });
    }
    return res.status(500).json({ success: false, message: 'Authentication failed' });
  }
};

// Middleware to check specific roles
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const userRole = req.user.role;

    if (typeof roles === 'string') {
      if (userRole !== roles) {
        return res.status(403).json({ success: false, message: `Access denied. ${roles} role required.` });
      }
    } else if (Array.isArray(roles)) {
      if (!roles.includes(userRole)) {
        return res.status(403).json({ success: false, message: `Access denied. One of these roles required: ${roles.join(', ')}` });
      }
    }

    next();
  };
};

// Specific role middlewares
const requireAdmin = requireRole('admin');
const requireTeacher = requireRole('teacher');
const requireStudent = requireRole('student');
const requireTeacherOrAdmin = requireRole(['teacher', 'admin']);

module.exports = {
  authenticateToken,
  requireRole,
  requireAdmin,
  requireTeacher,
  requireStudent,
  requireTeacherOrAdmin
}; 