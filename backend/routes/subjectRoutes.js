const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');
const { authenticateJWT } = require('../middleware/userAuth');

router.get('/', authenticateJWT, subjectController.getAllSubjects);
router.get('/:id', authenticateJWT, subjectController.getSubjectById);
router.post('/', authenticateJWT, subjectController.createSubject);
router.put('/:id', authenticateJWT, subjectController.updateSubject);
router.delete('/:id', authenticateJWT, subjectController.deleteSubject);

module.exports = router;