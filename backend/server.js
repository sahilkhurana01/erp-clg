const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');

const { connectMongo } = require('./db');
const User = require('./models/User');
const Student = require('./models/Student');
const Teacher = require('./models/Teacher');

const app = express();

// Basic middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({ success: true, message: 'ERP Backend API Running', version: '1.0.0', timestamp: new Date().toISOString() });
});

// Quick health check for testing
app.get('/health', (req, res) => {
  res.json({ success: true, message: 'Server is healthy', timestamp: new Date().toISOString() });
});

// API status route
app.get('/api/status', (req, res) => {
  res.json({ success: true, message: 'API is running', timestamp: new Date().toISOString() });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test route working' });
});

// Dashboard stats (Mongo)
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    await connectMongo();
    const [students, teachers] = await Promise.all([
      Student.countDocuments({}),
      Teacher.countDocuments({}),
    ]);
    // classes/subjects/announcements not yet migrated; return 0 to avoid breakage
    res.json({ success: true, data: { totalStudents: students, totalTeachers: teachers, totalClasses: 0, totalSubjects: 0, totalAnnouncements: 0 } });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to load stats' });
  }
});

app.get('/api/dashboard/recent-activity', async (req, res) => {
  try {
    await connectMongo();
    const [recentStudents, recentTeachers] = await Promise.all([
      Student.find({}).sort({ createdAt: -1 }).limit(5).select('id name createdAt'),
      Teacher.find({}).sort({ createdAt: -1 }).limit(5).select('id name createdAt'),
    ]);

    const items = [
      ...recentStudents.map(s => ({ type: 'student', text: `New student: ${s.name}`, time: s.createdAt })),
      ...recentTeachers.map(t => ({ type: 'teacher', text: `New teacher: ${t.name}`, time: t.createdAt })),
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
app.use('/api/teachers', teacherRoutes);
const classRoutes = require('./routes/classRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
app.use('/api/classes', classRoutes);
app.use('/api/subjects', subjectRoutes);

// Enable Mongoose-backed routes
const announcementRoutes = require('./routes/announcementRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const resultRoutes = require('./routes/resultRoutes');
const timetableRoutes = require('./routes/timetableRoutes');
app.use('/api/announcements', announcementRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/timetable', timetableRoutes);

const PORT = process.env.PORT || 4000;
// Start server even if MongoDB is not available; DB connections occur per-request
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 API URL: http://localhost:${PORT}`);
});
