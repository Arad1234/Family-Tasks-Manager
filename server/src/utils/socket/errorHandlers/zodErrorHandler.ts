import { Socket } from 'socket.io';
import { INTERNAL_SERVER_ERROR } from '../../constants';

export const zodErrorHandler = (socket: Socket) => {
	// If the middleware call "next(error)" it will automatically be handled by this event listener (zod validationSchema).
	socket.on('error', (err: any) => {
		err.statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
		err.status = err.status || 'error';

		// I have "error" event listener in the client.
		socket.emit('error', { status: err.status, message: err.message });
	});
};
