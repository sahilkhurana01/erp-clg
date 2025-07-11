const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSubjectById = async (req, res) => {
  try {
    const subject = await prisma.subject.findUnique({ where: { id: Number(req.params.id) } });
    if (!subject) return res.status(404).json({ error: 'Subject not found' });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSubject = async (req, res) => {
  try {
    const subject = await prisma.subject.create({ data: req.body });
    res.status(201).json(subject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateSubject = async (req, res) => {
  try {
    const subject = await prisma.subject.update({ where: { id: Number(req.params.id) }, data: req.body });
    res.json(subject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    await prisma.subject.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Subject deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};