import { StatusCodes } from 'http-status-codes';
import { config } from '../config/config';
import { CookieOptions } from 'express';

export const { INTERNAL_SERVER_ERROR, OK, BAD_REQUEST, UNAUTHORIZED, CREATED, NOT_FOUND } = StatusCodes;

export const mailAuthConfig = {
	type: 'OAuth2',
	user: config.email.adminEmail,
	clientId: config.email.clientId,
	clientSecret: config.email.clientSecret,
	refreshToken: config.email.refreshToken,
};

export const PAGE_LIMIT = 5;

export const isProduction = config.environment.nodeEnv === 'production';

export const userToSocketMap = new Map();

export const corsOptions = {
	origin: ['http://localhost:4173'],
	credentials: true,
	methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT', 'PATCH'],
	allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
};

export const ONE_HOUR = 60 * 60 * 1000;

export const cookieOptions: CookieOptions = {
	httpOnly: true,
	maxAge: 900000000,
	secure: isProduction,
};
