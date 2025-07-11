const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { authenticateJWT } = require('../middleware/userAuth');

router.get('/', authenticateJWT, attendanceController.getAllAttendance);
router.get('/:id', authenticateJWT, attendanceController.getAttendanceById);
router.post('/', authenticateJWT, attendanceController.createAttendance);
router.put('/:id', authenticateJWT, attendanceController.updateAttendance);
router.delete('/:id', authenticateJWT, attendanceController.deleteAttendance);

module.exports = router;