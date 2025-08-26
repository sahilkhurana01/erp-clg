const bcrypt = require('bcryptjs');
const { connectMongo } = require('../db');
const User = require('../models/User');
const Student = require('../models/Student');

exports.getAllStudents = async (req, res) => {
  try {
    await connectMongo();
    const students = await Student.find({}).sort({ createdAt: -1 });
    res.json(students.map(s => ({
      _id: s._id,
      name: s.name,
      email: s.email,
      rollNo: s.rollNo,
      section: s.section,
      createdAt: s.createdAt,
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    await connectMongo();
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    await connectMongo();
    const { name, email, password, rollNo, classId, section, phone, address, bloodGroup, parentName, parentPhone } = req.body;

    if (!name || !email || !password || !rollNo || !classId || !section) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'User with this email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role: 'student', isActive: true });

    const student = await Student.create({
      userId: user._id,
      name,
      email,
      rollNo,
      classId,
      section,
      phone: phone || null,
      address: address || null,
      bloodGroup: bloodGroup || null,
      parentName: parentName || null,
      parentPhone: parentPhone || null
    });

    res.status(201).json({ success: true, student, user: { id: String(user._id), email: user.email, role: user.role } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    await connectMongo();
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await connectMongo();
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    await Student.deleteOne({ _id: student._id });
    await User.deleteOne({ _id: student.userId });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};