const { connectMongo } = require('../db');
const Attendance = require('../models/Attendance');

// Get attendance for a specific class on a specific date or date range
exports.getClassAttendance = async (req, res) => {
  try {
    await connectMongo();
    const { classId } = req.params;
    const { date, startDate, endDate, history } = req.query;
    const filter = { classId };
    if (history === 'true' && startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    } else if (date) {
      const d = new Date(date);
      const next = new Date(d);
      next.setDate(d.getDate() + 1);
      filter.date = { $gte: d, $lt: next };
    } else {
      const today = new Date();
      const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
      filter.date = { $gte: start, $lt: end };
    }
    const items = await Attendance.find(filter).sort(history === 'true' ? { date: -1 } : { createdAt: -1 });
    res.json({ success: true, data: items, type: history === 'true' ? 'historical' : 'current' });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Mark attendance for students
exports.markAttendance = async (req, res) => {
  try {
    await connectMongo();
    const attendanceData = req.body; // expect single record per call
    const attendance = await Attendance.create(attendanceData);
    res.status(201).json({ success: true, data: attendance });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Update attendance record
exports.updateAttendance = async (req, res) => {
  try {
    await connectMongo();
    const { id } = req.params;
    const updateData = req.body;
    const attendance = await Attendance.findByIdAndUpdate(id, updateData, { new: true });
    res.json({ success: true, data: attendance });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Get attendance history for a specific student
exports.getStudentAttendance = async (req, res) => {
  try {
    await connectMongo();
    const { studentId } = req.params;
    const { startDate, endDate } = req.query;
    const filter = { studentId };
    if (startDate && endDate) filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    const attendance = await Attendance.find(filter).sort({ date: -1 });
    res.json({ success: true, data: attendance });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Get attendance history for a specific class
exports.getClassAttendanceHistory = async (req, res) => {
  try {
    await connectMongo();
    const { classId } = req.params;
    const { startDate, endDate } = req.query;
    const filter = { classId };
    if (startDate && endDate) filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    const attendance = await Attendance.find(filter).sort({ date: -1 });
    res.json({ success: true, data: attendance });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Legacy functions for backward compatibility
exports.getAllAttendance = async (req, res) => {
  try {
    await connectMongo();
    const attendance = await Attendance.find({});
    res.json({ success: true, data: attendance });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

exports.getAttendanceById = async (req, res) => {
  try {
    await connectMongo();
    const { id } = req.params;
    const attendance = await Attendance.findById(id);
    if (!attendance) return res.status(404).json({ success: false, error: 'Attendance not found' });
    res.json({ success: true, data: attendance });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

exports.createAttendance = async (req, res) => {
  try {
    await connectMongo();
    const attendance = await Attendance.create(req.body);
    res.status(201).json({ success: true, data: attendance });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    await connectMongo();
    const { id } = req.params;
    await Attendance.deleteOne({ _id: id });
    res.json({ success: true, message: 'Attendance deleted successfully' });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
};