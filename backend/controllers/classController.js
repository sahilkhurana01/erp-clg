const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllClasses = async (req, res) => {
  try {
    const classes = await prisma.class.findMany();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getClassById = async (req, res) => {
  try {
    const classObj = await prisma.class.findUnique({ where: { id: Number(req.params.id) } });
    if (!classObj) return res.status(404).json({ error: 'Class not found' });
    res.json(classObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createClass = async (req, res) => {
  try {
    const classObj = await prisma.class.create({ data: req.body });
    res.status(201).json(classObj);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const classObj = await prisma.class.update({ where: { id: Number(req.params.id) }, data: req.body });
    res.json(classObj);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    await prisma.class.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Class deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};