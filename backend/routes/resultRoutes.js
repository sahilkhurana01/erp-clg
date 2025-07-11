const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');
const { authenticateJWT } = require('../middleware/userAuth');

router.get('/', authenticateJWT, resultController.getAllResults);
router.get('/:id', authenticateJWT, resultController.getResultById);
router.post('/', authenticateJWT, resultController.createResult);
router.put('/:id', authenticateJWT, resultController.updateResult);
router.delete('/:id', authenticateJWT, resultController.deleteResult);

module.exports = router;