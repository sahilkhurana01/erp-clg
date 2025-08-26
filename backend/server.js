const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const resultRoutes = require('./routes/resultRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const classRoutes = require('./routes/classRoutes');
const subjectRoutes = require('./routes/subjectRoutes');

const app = express();

// Basic middleware
app.use(cors());
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

// Quick health check for testing
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
});

// API status route
app.get('/api/status', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test route working' });
});

// Dashboard stats (lightweight admin dashboard API)
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    const [students, teachers, classes, subjects, announcements] = await Promise.all([
      prisma.student.count(),
      prisma.teacher.count(),
      prisma.class.count(),
      prisma.subject.count(),
      prisma.announcement.count(),
    ]);

    res.json({
      success: true,
      data: {
        totalStudents: students,
        totalTeachers: teachers,
        totalClasses: classes,
        totalSubjects: subjects,
        totalAnnouncements: announcements
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to load stats' });
  }
});

app.get('/api/dashboard/recent-activity', async (req, res) => {
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    const [recentStudents, recentTeachers, recentAnnouncements] = await Promise.all([
      prisma.student.findMany({ orderBy: { createdAt: 'desc' }, take: 5, select: { id: true, name: true, createdAt: true } }),
      prisma.teacher.findMany({ orderBy: { createdAt: 'desc' }, take: 5, select: { id: true, name: true, createdAt: true } }),
      prisma.announcement.findMany({ orderBy: { createdAt: 'desc' }, take: 5, select: { id: true, title: true, createdAt: true } }),
    ]);

    const items = [
      ...recentStudents.map(s => ({ type: 'student', text: `New student: ${s.name}`, time: s.createdAt })),
      ...recentTeachers.map(t => ({ type: 'teacher', text: `New teacher: ${t.name}`, time: t.createdAt })),
      ...recentAnnouncements.map(a => ({ type: 'announcement', text: `Announcement: ${a.title}`, time: a.createdAt })),
    ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 10);

    res.json({ success: true, data: items });
  } catch (error) {
    console.error('Recent activity error:', error);
    res.status(500).json({ success: false, message: 'Failed to load activity' });
  }
});

// Public routes (no authentication required)
app.use('/api/auth', authRoutes);

// Protected routes (authentication required)
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/subjects', subjectRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Test server with ALL routes running on port ${PORT}`);
  console.log(`🔗 API URL: http://localhost:${PORT}`);
});
