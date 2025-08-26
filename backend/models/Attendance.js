const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
	studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
	classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
	teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true, index: true },
	date: { type: Date, required: true, index: true },
	status: { type: String, enum: ['present', 'absent', 'late'], default: 'present' },
	note: { type: String, default: null },
}, { timestamps: true });

AttendanceSchema.index({ studentId: 1, date: 1 }, { unique: false });

module.exports = mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);


