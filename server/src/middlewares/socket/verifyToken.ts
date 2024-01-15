import jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';
import AppError from '../../utils/appErrorClass';
import { BAD_REQUEST } from '../../utils/constants';
import { config } from '../../config/config';

export const verifyToken = (socket: Socket, next: Function) => {
	const { cookie } = socket.handshake.headers;
	const token = cookie?.split('=')[1];

	try {
		const userInfo = jwt.verify(token!, config.auth.jwtSecret!);
		socket.data.user = userInfo;
		next();
	} catch (error: any) {
		next(new Error(error));
	}
};
