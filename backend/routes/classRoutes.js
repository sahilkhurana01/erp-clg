const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

router.get('/', authenticateToken, requireAdmin, classController.getAllClasses);
router.get('/:id', authenticateToken, requireAdmin, classController.getClassById);
router.post('/', authenticateToken, requireAdmin, classController.createClass);
router.put('/:id', authenticateToken, requireAdmin, classController.updateClass);
router.delete('/:id', authenticateToken, requireAdmin, classController.deleteClass);

module.exports = router;