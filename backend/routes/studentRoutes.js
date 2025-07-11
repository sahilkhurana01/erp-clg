const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticateJWT } = require('../middleware/userAuth');

router.get('/', authenticateJWT, studentController.getAllStudents);
router.get('/:id', authenticateJWT, studentController.getStudentById);
router.post('/', authenticateJWT, studentController.createStudent);
router.put('/:id', authenticateJWT, studentController.updateStudent);
router.delete('/:id', authenticateJWT, studentController.deleteStudent);

module.exports = router;