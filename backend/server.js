const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const classRoutes = require('./routes/classRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const resultRoutes = require('./routes/resultRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const authRoutes = require('./routes/authRoutes');
const roleAuth = require('./middleware/roleAuth');

const app = express();

app.use(cors({
  origin: '*', // Update with your frontend URL in production
  credentials: true
}));
app.use(express.json());

app.use('/api/students', roleAuth('admin'), studentRoutes);
app.use('/api/teachers', roleAuth('admin'), teacherRoutes);
app.use('/api/classes', roleAuth('admin'), classRoutes);
app.use('/api/subjects', roleAuth('admin'), subjectRoutes);
app.use('/api/attendance', roleAuth('teacher'), attendanceRoutes);
app.use('/api/results', roleAuth('teacher'), resultRoutes);
app.use('/api/announcements', roleAuth('admin'), announcementRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('ERP Backend API Running');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});