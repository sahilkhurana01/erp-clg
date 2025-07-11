const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { authenticateJWT } = require('../middleware/userAuth');

router.get('/', authenticateJWT, teacherController.getAllTeachers);
router.get('/:id', authenticateJWT, teacherController.getTeacherById);
router.post('/', authenticateJWT, teacherController.createTeacher);
router.put('/:id', authenticateJWT, teacherController.updateTeacher);
router.delete('/:id', authenticateJWT, teacherController.deleteTeacher);

module.exports = router;