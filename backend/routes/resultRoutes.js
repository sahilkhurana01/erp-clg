const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');
const { authenticateToken, requireTeacherOrAdmin } = require('../middleware/auth');

router.get('/class/:classId', authenticateToken, requireTeacherOrAdmin, resultController.getClassResults);
router.get('/student/:studentId', authenticateToken, requireTeacherOrAdmin, resultController.getStudentResults);
router.post('/', authenticateToken, requireTeacherOrAdmin, resultController.createResult);
router.put('/:id', authenticateToken, requireTeacherOrAdmin, resultController.updateResult);
router.delete('/:id', authenticateToken, requireTeacherOrAdmin, resultController.deleteResult);
router.post('/bulk', authenticateToken, requireTeacherOrAdmin, resultController.bulkCreateResults);

module.exports = router;