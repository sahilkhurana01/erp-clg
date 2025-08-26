const { connectMongo } = require('../db');
const Announcement = require('../models/Announcement');
const User = require('../models/User');

// Get all announcements
exports.getAllAnnouncements = async (req, res) => {
  try {
    await connectMongo();
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [items, total] = await Promise.all([
      Announcement.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Announcement.countDocuments({})
    ]);

    // Optionally enrich with author fields
    const authorIds = Array.from(new Set(items.map(a => String(a.authorId))));
    const authors = await User.find({ _id: { $in: authorIds } }).select('name email').lean();
    const idToAuthor = new Map(authors.map(a => [String(a._id), { id: String(a._id), name: a.name, email: a.email }]));
    const data = items.map(a => ({
      ...a,
      id: String(a._id),
      author: idToAuthor.get(String(a.authorId)) || null,
    }));

    res.json({ success: true, data, pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit)) } });
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
    await connectMongo();
    const { id } = req.params;
    const a = await Announcement.findById(id).lean();
    if (!a) return res.status(404).json({ success: false, error: 'Announcement not found' });
    const author = await User.findById(a.authorId).select('name email').lean();
    res.json({ success: true, data: { ...a, id: String(a._id), author: author ? { id: String(author._id), name: author.name, email: author.email } : null } });
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
    await connectMongo();
    const a = await Announcement.create({
      title: req.body.title,
      content: req.body.content,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true,
      priority: req.body.priority || 'low',
      authorId: req.user.id,
    });
    res.status(201).json({ success: true, data: { ...a.toObject(), id: String(a._id) } });
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
    await connectMongo();
    const { id } = req.params;
    const a = await Announcement.findByIdAndUpdate(id, req.body, { new: true }).lean();
    if (!a) return res.status(404).json({ success: false, error: 'Announcement not found' });
    res.json({ success: true, data: { ...a, id: String(a._id) } });
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
    await connectMongo();
    const { id } = req.params;
    await Announcement.deleteOne({ _id: id });
    res.json({ success: true, message: 'Announcement deleted successfully' });
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
    await connectMongo();
    const { id } = req.params;
    const a = await Announcement.findById(id);
    if (!a) return res.status(404).json({ success: false, error: 'Announcement not found' });
    a.isActive = !a.isActive;
    await a.save();
    res.json({ success: true, data: { ...a.toObject(), id: String(a._id) }, message: `Announcement ${a.isActive ? 'activated' : 'deactivated'} successfully` });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
};