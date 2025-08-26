const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

router.get('/', authenticateToken, requireAdmin, teacherController.getAllTeachers);
router.get('/:id', authenticateToken, requireAdmin, teacherController.getTeacherById);
router.post('/', authenticateToken, requireAdmin, teacherController.createTeacher);
router.put('/:id', authenticateToken, requireAdmin, teacherController.updateTeacher);
router.delete('/:id', authenticateToken, requireAdmin, teacherController.deleteTeacher);

module.exports = router;