const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllAttendance = async (req, res) => {
  try {
    const attendance = await prisma.attendance.findMany();
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAttendanceById = async (req, res) => {
  try {
    const attendance = await prisma.attendance.findUnique({ where: { id: Number(req.params.id) } });
    if (!attendance) return res.status(404).json({ error: 'Attendance not found' });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAttendance = async (req, res) => {
  try {
    const attendance = await prisma.attendance.create({ data: req.body });
    res.status(201).json(attendance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const attendance = await prisma.attendance.update({ where: { id: Number(req.params.id) }, data: req.body });
    res.json(attendance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    await prisma.attendance.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Attendance deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};