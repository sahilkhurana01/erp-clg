const { connectMongo } = require('../db');
const TimetableEntry = require('../models/TimetableEntry');

exports.getClassTimetable = async (req, res) => {
  try {
    await connectMongo();
    const { classId } = req.params;
    const { day } = req.query;
    const filter = { classId };
    if (day) filter.day = day;
    const entries = await TimetableEntry.find(filter).sort({ day: 1, period: 1 });
    res.json({ success: true, data: entries });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createEntry = async (req, res) => {
  try {
    await connectMongo();
    const entry = await TimetableEntry.create(req.body);
    res.status(201).json({ success: true, data: entry });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.updateEntry = async (req, res) => {
  try {
    await connectMongo();
    const { id } = req.params;
    const entry = await TimetableEntry.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ success: true, data: entry });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    await connectMongo();
    const { id } = req.params;
    await TimetableEntry.deleteOne({ _id: id });
    res.json({ success: true, message: 'Timetable entry deleted' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};


