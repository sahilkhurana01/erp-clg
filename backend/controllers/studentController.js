const { PrismaClient } = require('@prisma/client');
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
    const student = await prisma.student.findUnique({ where: { id: Number(req.params.id) } });
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const student = await prisma.student.create({ data: req.body });
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await prisma.student.update({ where: { id: Number(req.params.id) }, data: req.body });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await prisma.student.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};