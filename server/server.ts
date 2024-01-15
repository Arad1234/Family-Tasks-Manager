import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './src/routes/authRoutes';
import cookieParser from 'cookie-parser';
import { expressErrorHandler } from './src/middlewares/express/expressErrorHandler';
import { connectSocketServer } from './socket';
import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { NOT_FOUND } from './src/utils/constants';
import AppError from './src/utils/appErrorClass';
import { connectDB } from './db';
import { config } from './src/config/config';

dotenv.config();

// Handling exception errors.
process.on('uncaughtException', (err: any) => {
	console.log(err.name, err.message);
	console.log('UNCAUGHT EXECPTION! 💥 Shutting down...');
	process.exit(1);
});

const app = express();

const corsOptions = {
	origin: ['http://localhost:4173'],
	credentials: true,
	methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT', 'PATCH'],
	allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
};

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// limit requests from same API to 500.
const limiter = rateLimit({
	max: 500,
	windowMs: 60 * 60 * 1000,
	message: 'To much requests, try again in an hour!',
});

app.use(limiter);

// For secure http headers
app.use(helmet());

// For preventing js and html scripts to corrupt data in DB and server.
app.use(xss());

// For preventing NoSql query injection in input fields.
app.use(mongoSanitize());

// For preventing parameter pollution (same query key name).
app.use(hpp());

connectDB().then(() => {
	connectSocketServer(app);
});

app.use('/api/v1/user', authRouter);

app.all('*', (req, _res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, NOT_FOUND));
});

app.use(expressErrorHandler);

const port = config.server.port || 3000;

const server = app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

// Handling async code that don't have a "catch" block.
process.on('unhandledRejection', (err: any) => {
	console.log(err.name, err.message);
	console.log('UNHANDLED REJECTION! 💥 Shutting down...');
	server.close(() => {
		process.exit(1);
	});
});
