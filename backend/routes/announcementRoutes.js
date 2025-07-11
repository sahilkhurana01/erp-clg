const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const { authenticateJWT } = require('../middleware/userAuth');

router.get('/', authenticateJWT, announcementController.getAllAnnouncements);
router.get('/:id', authenticateJWT, announcementController.getAnnouncementById);
router.post('/', authenticateJWT, announcementController.createAnnouncement);
router.put('/:id', authenticateJWT, announcementController.updateAnnouncement);
router.delete('/:id', authenticateJWT, announcementController.deleteAnnouncement);

module.exports = router;