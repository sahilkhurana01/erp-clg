const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await prisma.teacher.findMany();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await prisma.teacher.findUnique({ where: { id: req.params.id } });
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTeacher = async (req, res) => {
  try {
    const { name, email, password, employeeId, subject, phone, address, qualification, experience, salary } = req.body;

    if (!name || !email || !password || !employeeId || !subject) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create linked user first
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'teacher',
        isActive: true
      }
    });

    const teacher = await prisma.teacher.create({
      data: {
        userId: user.id,
        name,
        email,
        employeeId,
        subject,
        phone: phone || null,
        address: address || null,
        qualification: qualification || null,
        experience: experience || null,
        salary: salary || null
      }
    });

    res.status(201).json({ success: true, teacher, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await prisma.teacher.update({ where: { id: req.params.id }, data: req.body });
    res.json(teacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    await prisma.teacher.delete({ where: { id: req.params.id } });
    res.json({ message: 'Teacher deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};