const mongoose = require('mongoose');

let isConnected = false;

async function connectMongo() {
	if (isConnected) return mongoose.connection;

	const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/erp';
	const redactedUri = mongoUri.replace(/(mongodb\+srv:\/\/)([^:]+):([^@]+)@/, (_, p1, u) => `${p1}${u}:***@`);
	console.log('🗄️ Using Mongo URI:', redactedUri);

	mongoose.set('strictQuery', true);
	await mongoose.connect(mongoUri, {
		serverSelectionTimeoutMS: 10000,
	});
	isConnected = true;
	console.log(`✅ Connected to MongoDB at ${mongoUri}`);
	return mongoose.connection;
}

module.exports = { connectMongo };
