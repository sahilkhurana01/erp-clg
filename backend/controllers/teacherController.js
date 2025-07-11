const { PrismaClient } = require('@prisma/client');
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
    const teacher = await prisma.teacher.findUnique({ where: { id: Number(req.params.id) } });
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTeacher = async (req, res) => {
  try {
    const teacher = await prisma.teacher.create({ data: req.body });
    res.status(201).json(teacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await prisma.teacher.update({ where: { id: Number(req.params.id) }, data: req.body });
    res.json(teacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    await prisma.teacher.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Teacher deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};