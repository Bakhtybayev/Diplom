const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);

		console.log(`KAIF MONGO KOSYLDI PORT ${conn.connection.host}`.cyan.underline);
	} catch(error) {
		console.log('Bileeeee oshibka zb', error);
		process.exit(1);
	}
}

module.exports = connectDB;