const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

router.get('/', authenticateToken, requireAdmin, studentController.getAllStudents);
router.get('/:id', authenticateToken, requireAdmin, studentController.getStudentById);
router.post('/', authenticateToken, requireAdmin, studentController.createStudent);
router.put('/:id', authenticateToken, requireAdmin, studentController.updateStudent);
router.delete('/:id', authenticateToken, requireAdmin, studentController.deleteStudent);

module.exports = router;