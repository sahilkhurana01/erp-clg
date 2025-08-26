// This file can re-export helpers from auth.js for compatibility
const { requireAdmin, requireTeacher, requireStudent, requireTeacherOrAdmin } = require('./auth');
module.exports = { requireAdmin, requireTeacher, requireStudent, requireTeacherOrAdmin };