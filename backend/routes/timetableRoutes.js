const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timetableController');
const { authenticateToken, requireTeacherOrAdmin } = require('../middleware/auth');

router.get('/class/:classId', authenticateToken, requireTeacherOrAdmin, timetableController.getClassTimetable);
router.post('/', authenticateToken, requireTeacherOrAdmin, timetableController.createEntry);
router.put('/:id', authenticateToken, requireTeacherOrAdmin, timetableController.updateEntry);
router.delete('/:id', authenticateToken, requireTeacherOrAdmin, timetableController.deleteEntry);

module.exports = router;


