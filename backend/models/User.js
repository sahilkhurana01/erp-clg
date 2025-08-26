const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true, index: true },
	password: { type: String, required: true },
	role: { type: String, enum: ['admin', 'teacher', 'student'], required: true },
	isActive: { type: Boolean, default: true },
	resetOtp: { type: String, default: null },
	resetOtpExpireAt: { type: Number, default: null },
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
