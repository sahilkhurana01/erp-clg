const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
	title: { type: String, required: true },
	content: { type: String, required: true },
	authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
	isActive: { type: Boolean, default: true },
	priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
}, { timestamps: true });

module.exports = mongoose.models.Announcement || mongoose.model('Announcement', AnnouncementSchema);


