const { connectMongo } = require('../db');
const ClassModel = require('../models/Class');
const Teacher = require('../models/Teacher');

exports.getAllClasses = async (req, res) => {
  try {
    await connectMongo();
    const classes = await ClassModel.find({}).sort({ createdAt: -1 });
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getClassById = async (req, res) => {
  try {
    await connectMongo();
    const classObj = await ClassModel.findById(req.params.id);
    if (!classObj) return res.status(404).json({ error: 'Class not found' });
    res.json(classObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createClass = async (req, res) => {
  try {
    await connectMongo();
    const { name, section, capacity, teacherId } = req.body;
    if (!name || !section) return res.status(400).json({ error: 'name and section are required' });
    const classObj = await ClassModel.create({ name, section, capacity: capacity || 0, teacherId: teacherId || null });
    res.status(201).json(classObj);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateClass = async (req, res) => {
  try {
    await connectMongo();
    const classObj = await ClassModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(classObj);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    await connectMongo();
    await ClassModel.deleteOne({ _id: req.params.id });
    res.json({ message: 'Class deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};