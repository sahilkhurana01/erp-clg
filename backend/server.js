const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const classRoutes = require('./routes/classRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const resultRoutes = require('./routes/resultRoutes');
const announcementRoutes = require('./routes/announcementRoutes');

// Import middleware
const { authenticateToken, requireAdmin, requireTeacher, requireTeacherOrAdmin } = require('./middleware/auth');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'ERP Backend API Running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Public routes (no authentication required)
app.use('/api/auth', authRoutes);

// Protected routes (authentication required)
app.use('/api/students', authenticateToken, requireAdmin, studentRoutes);
app.use('/api/teachers', authenticateToken, requireAdmin, teacherRoutes);
app.use('/api/classes', authenticateToken, requireAdmin, classRoutes);
app.use('/api/subjects', authenticateToken, requireAdmin, subjectRoutes);
app.use('/api/attendance', authenticateToken, requireTeacherOrAdmin, attendanceRoutes);
app.use('/api/results', authenticateToken, requireTeacherOrAdmin, resultRoutes);
app.use('/api/announcements', authenticateToken, requireAdmin, announcementRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API URL: http://localhost:${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/`);
});