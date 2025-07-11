const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// TODO: Add authentication and entity routes here

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Utility: Generate JWT
function generateToken(user, role) {
  return jwt.sign({ id: user.id, role }, JWT_SECRET, { expiresIn: '1d' });
}

// Middleware: Authenticate JWT
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Middleware: Authorize by role
function authorizeRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

// Login endpoints
app.post('/api/login/admin', async (req, res) => {
  const { username } = req.body;
  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
  // For demo: no password check, add password in real app
  const token = generateToken(admin, 'admin');
  res.json({ token, role: 'admin' });
});

app.post('/api/login/teacher', async (req, res) => {
  const { username } = req.body;
  const teacher = await prisma.teacher.findUnique({ where: { username } });
  if (!teacher) return res.status(401).json({ error: 'Invalid credentials' });
  const token = generateToken(teacher, 'teacher');
  res.json({ token, role: 'teacher' });
});

app.post('/api/login/student', async (req, res) => {
  const { username } = req.body;
  const student = await prisma.student.findUnique({ where: { username } });
  if (!student) return res.status(401).json({ error: 'Invalid credentials' });
  const token = generateToken(student, 'student');
  res.json({ token, role: 'student' });
});

// Example protected route
app.get('/api/me', authenticateJWT, (req, res) => {
  res.json({ user: req.user });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 