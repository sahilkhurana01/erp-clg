const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

router.get('/', authenticateToken, requireAdmin, announcementController.getAllAnnouncements);
router.get('/:id', authenticateToken, requireAdmin, announcementController.getAnnouncementById);
router.post('/', authenticateToken, requireAdmin, announcementController.createAnnouncement);
router.put('/:id', authenticateToken, requireAdmin, announcementController.updateAnnouncement);
router.delete('/:id', authenticateToken, requireAdmin, announcementController.deleteAnnouncement);
router.patch('/:id/toggle', authenticateToken, requireAdmin, announcementController.toggleAnnouncementStatus);

module.exports = router;