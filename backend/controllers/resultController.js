const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllResults = async (req, res) => {
  try {
    const results = await prisma.result.findMany();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getResultById = async (req, res) => {
  try {
    const result = await prisma.result.findUnique({ where: { id: Number(req.params.id) } });
    if (!result) return res.status(404).json({ error: 'Result not found' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createResult = async (req, res) => {
  try {
    const result = await prisma.result.create({ data: req.body });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateResult = async (req, res) => {
  try {
    const result = await prisma.result.update({ where: { id: Number(req.params.id) }, data: req.body });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteResult = async (req, res) => {
  try {
    await prisma.result.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Result deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};