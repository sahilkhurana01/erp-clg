const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
	studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
	subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true, index: true },
	classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
	examType: { type: String, enum: ['midterm', 'final', 'quiz', 'assignment'], default: 'midterm' },
	marks: { type: Number, required: true },
	grade: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.models.Result || mongoose.model('Result', ResultSchema);


