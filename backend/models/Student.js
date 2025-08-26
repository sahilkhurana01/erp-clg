const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
	name: { type: String, required: true },
	email: { type: String, required: true },
	rollNo: { type: String, required: true },
	classId: { type: String, required: true },
	section: { type: String, required: true },
	phone: { type: String, default: null },
	address: { type: String, default: null },
	bloodGroup: { type: String, default: null },
	parentName: { type: String, default: null },
	parentPhone: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.models.Student || mongoose.model('Student', StudentSchema);
