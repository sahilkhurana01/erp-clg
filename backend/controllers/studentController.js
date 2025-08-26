const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

exports.getAllStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await prisma.student.findUnique({ where: { id: req.params.id } });
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const { name, email, password, rollNo, classId, section, phone, address, bloodGroup, parentName, parentPhone } = req.body;

    if (!name || !email || !password || !rollNo || !classId || !section) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create linked user first
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'student',
        isActive: true
      }
    });

    // Create student profile
    const student = await prisma.student.create({
      data: {
        userId: user.id,
        name,
        email,
        rollNo,
        classId,
        section,
        phone: phone || null,
        address: address || null,
        bloodGroup: bloodGroup || null,
        parentName: parentName || null,
        parentPhone: parentPhone || null
      }
    });

    res.status(201).json({ success: true, student, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await prisma.student.update({ where: { id: req.params.id }, data: req.body });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await prisma.student.delete({ where: { id: req.params.id } });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};