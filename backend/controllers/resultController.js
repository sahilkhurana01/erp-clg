const { connectMongo } = require('../db');
const Result = require('../models/Result');
const Student = require('../models/Student');
const Subject = require('../models/Subject');

// Get results for a specific class by exam type
exports.getClassResults = async (req, res) => {
  try {
    await connectMongo();
    const { classId } = req.params;
    const { examType } = req.query;
    const filter = { classId };
    if (examType) filter.examType = examType;
    const results = await Result.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: results });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Get results for a specific student
exports.getStudentResults = async (req, res) => {
  try {
    await connectMongo();
    const { studentId } = req.params;
    const results = await Result.find({ studentId }).sort({ createdAt: -1 });
    res.json({ success: true, data: results });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Create a new result
exports.createResult = async (req, res) => {
  try {
    await connectMongo();
    const result = await Result.create(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Update a result
exports.updateResult = async (req, res) => {
  try {
    await connectMongo();
    const { id } = req.params;
    const result = await Result.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Delete a result
exports.deleteResult = async (req, res) => {
  try {
    await connectMongo();
    const { id } = req.params;
    await Result.deleteOne({ _id: id });
    res.json({ success: true, message: 'Result deleted successfully' });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Bulk create results
exports.bulkCreateResults = async (req, res) => {
  try {
    await connectMongo();
    const { results } = req.body;
    if (!Array.isArray(results)) return res.status(400).json({ success: false, error: 'Results must be an array' });
    const created = await Result.insertMany(results);
    res.status(201).json({ success: true, message: `${created.length} results created successfully`, count: created.length });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Legacy functions for backward compatibility
exports.getAllResults = async (req, res) => {
  try {
    await connectMongo();
    const results = await Result.find({});
    res.json({ success: true, data: results });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

exports.getResultById = async (req, res) => {
  try {
    await connectMongo();
    const { id } = req.params;
    const result = await Result.findById(id);
    if (!result) return res.status(404).json({ success: false, error: 'Result not found' });
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};