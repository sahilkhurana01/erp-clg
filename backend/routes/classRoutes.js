const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const { authenticateJWT } = require('../middleware/userAuth');

router.get('/', authenticateJWT, classController.getAllClasses);
router.get('/:id', authenticateJWT, classController.getClassById);
router.post('/', authenticateJWT, classController.createClass);
router.put('/:id', authenticateJWT, classController.updateClass);
router.delete('/:id', authenticateJWT, classController.deleteClass);

module.exports = router;