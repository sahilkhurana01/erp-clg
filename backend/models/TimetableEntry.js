const mongoose = require('mongoose');

const TimetableEntrySchema = new mongoose.Schema({
	classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
	subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
	teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
	day: { type: String, enum: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], required: true },
	period: { type: Number, required: true },
	room: { type: String, default: null },
}, { timestamps: true });

TimetableEntrySchema.index({ classId: 1, day: 1, period: 1 }, { unique: true });

module.exports = mongoose.models.TimetableEntry || mongoose.model('TimetableEntry', TimetableEntrySchema);


