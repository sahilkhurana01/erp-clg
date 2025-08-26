const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
	name: { type: String, required: true },
	email: { type: String, required: true },
	employeeId: { type: String, required: true },
	subject: { type: String, required: true },
	phone: { type: String, default: null },
	address: { type: String, default: null },
	qualification: { type: String, default: null },
	experience: { type: String, default: null },
	salary: { type: Number, default: null },
}, { timestamps: true });

module.exports = mongoose.models.Teacher || mongoose.model('Teacher', TeacherSchema);
