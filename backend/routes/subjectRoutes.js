const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

router.get('/', authenticateToken, requireAdmin, subjectController.getAllSubjects);
router.get('/:id', authenticateToken, requireAdmin, subjectController.getSubjectById);
router.post('/', authenticateToken, requireAdmin, subjectController.createSubject);
router.put('/:id', authenticateToken, requireAdmin, subjectController.updateSubject);
router.delete('/:id', authenticateToken, requireAdmin, subjectController.deleteSubject);

module.exports = router;