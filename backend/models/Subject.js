const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
	name: { type: String, required: true },
	code: { type: String, required: true, unique: true },
	classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', default: null },
	teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', default: null },
}, { timestamps: true });

module.exports = mongoose.models.Subject || mongoose.model('Subject', SubjectSchema);


