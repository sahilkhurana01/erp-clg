const { connectMongo } = require('../db');
const Subject = require('../models/Subject');

exports.getAllSubjects = async (req, res) => {
  try {
    await connectMongo();
    const subjects = await Subject.find({}).sort({ createdAt: -1 });
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSubjectById = async (req, res) => {
  try {
    await connectMongo();
    const subject = await Subject.findById(req.params.id);
    if (!subject) return res.status(404).json({ error: 'Subject not found' });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSubject = async (req, res) => {
  try {
    await connectMongo();
    const { name, code, classId, teacherId } = req.body;
    if (!name || !code) return res.status(400).json({ error: 'name and code are required' });
    const subject = await Subject.create({ name, code, classId: classId || null, teacherId: teacherId || null });
    res.status(201).json(subject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateSubject = async (req, res) => {
  try {
    await connectMongo();
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(subject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    await connectMongo();
    await Subject.deleteOne({ _id: req.params.id });
    res.json({ message: 'Subject deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};