const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all announcements
exports.getAllAnnouncements = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    
    const announcements = await prisma.announcement.findMany({
      skip: parseInt(skip),
      take: parseInt(limit),
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    const total = await prisma.announcement.count();
    
    res.json({
      success: true,
      data: announcements,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Get announcement by ID
exports.getAnnouncementById = async (req, res) => {
  try {
    const { id } = req.params;
    const announcement = await prisma.announcement.findUnique({ 
      where: { id: id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    
    if (!announcement) {
      return res.status(404).json({ 
        success: false,
        error: 'Announcement not found' 
      });
    }
    
    res.json({
      success: true,
      data: announcement
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Create new announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const announcementData = {
      ...req.body,
      authorId: req.user.id
    };
    
    const announcement = await prisma.announcement.create({ 
      data: announcementData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    
    res.status(201).json({
      success: true,
      data: announcement
    });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Update announcement
exports.updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const announcement = await prisma.announcement.update({ 
      where: { id: id }, 
      data: req.body,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    
    res.json({
      success: true,
      data: announcement
    });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Delete announcement
exports.deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.announcement.delete({ where: { id: id } });
    res.json({ 
      success: true,
      message: 'Announcement deleted successfully' 
    });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Toggle announcement status
exports.toggleAnnouncementStatus = async (req, res) => {
  try {
    const { id } = req.params;
    
    const announcement = await prisma.announcement.findUnique({
      where: { id: id }
    });
    
    if (!announcement) {
      return res.status(404).json({
        success: false,
        error: 'Announcement not found'
      });
    }
    
    const updatedAnnouncement = await prisma.announcement.update({
      where: { id: id },
      data: { isActive: !announcement.isActive },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    
    res.json({
      success: true,
      data: updatedAnnouncement,
      message: `Announcement ${updatedAnnouncement.isActive ? 'activated' : 'deactivated'} successfully`
    });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
};