const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { authenticateToken, requireTeacherOrAdmin } = require('../middleware/auth');

// Get class attendance (with optional date parameter for current vs historical)
router.get('/class/:classId', authenticateToken, requireTeacherOrAdmin, attendanceController.getClassAttendance);
router.get('/class/:classId/history', authenticateToken, requireTeacherOrAdmin, attendanceController.getClassAttendanceHistory);

// Mark attendance for students
router.post('/', authenticateToken, requireTeacherOrAdmin, attendanceController.markAttendance);

// Update attendance record
router.put('/:id', authenticateToken, requireTeacherOrAdmin, attendanceController.updateAttendance);

// Get student attendance history
router.get('/student/:studentId', authenticateToken, requireTeacherOrAdmin, attendanceController.getStudentAttendance);

module.exports = router;