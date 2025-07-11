const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await prisma.announcement.findMany();
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAnnouncementById = async (req, res) => {
  try {
    const announcement = await prisma.announcement.findUnique({ where: { id: Number(req.params.id) } });
    if (!announcement) return res.status(404).json({ error: 'Announcement not found' });
    res.json(announcement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAnnouncement = async (req, res) => {
  try {
    const announcement = await prisma.announcement.create({ data: req.body });
    res.status(201).json(announcement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateAnnouncement = async (req, res) => {
  try {
    const announcement = await prisma.announcement.update({ where: { id: Number(req.params.id) }, data: req.body });
    res.json(announcement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    await prisma.announcement.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Announcement deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};