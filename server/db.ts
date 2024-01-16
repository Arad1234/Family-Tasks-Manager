import mongoose from 'mongoose';
import { config } from './src/config/config';

export const connectDB = async () => {
	try {
		await mongoose.connect(config.mongo.url!);
		console.log('Connected to DB');
	} catch (error) {
		console.error(error);
	}
};
