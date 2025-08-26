const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
	name: { type: String, required: true },
	section: { type: String, required: true },
	capacity: { type: Number, default: 0 },
	teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', default: null },
}, { timestamps: true });

module.exports = mongoose.models.Class || mongoose.model('Class', ClassSchema);


