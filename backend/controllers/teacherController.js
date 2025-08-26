const bcrypt = require('bcryptjs');
const { connectMongo } = require('../db');
const User = require('../models/User');
const Teacher = require('../models/Teacher');

exports.getAllTeachers = async (req, res) => {
  try {
    await connectMongo();
    const teachers = await Teacher.find({});
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTeacherById = async (req, res) => {
  try {
    await connectMongo();
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTeacher = async (req, res) => {
  try {
    await connectMongo();
    const { name, email, password, employeeId, subject, phone, address, qualification, experience, salary } = req.body;

    if (!name || !email || !password || !employeeId || !subject) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'User with this email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role: 'teacher', isActive: true });

    const teacher = await Teacher.create({
      userId: user._id,
      name,
      email,
      employeeId,
      subject,
      phone: phone || null,
      address: address || null,
      qualification: qualification || null,
      experience: experience || null,
      salary: salary || null
    });

    res.status(201).json({ success: true, teacher, user: { id: String(user._id), email: user.email, role: user.role } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    await connectMongo();
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(teacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    await connectMongo();
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
    await Teacher.deleteOne({ _id: teacher._id });
    await User.deleteOne({ _id: teacher.userId });
    res.json({ message: 'Teacher deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};