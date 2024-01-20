import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export const generateToken = (userId: string, username: string) => {
	const token = jwt.sign({ userId, username }, config.auth.jwtSecret!, {
		expiresIn: config.auth.jwtExpiresIn,
	});
	return token;
};
