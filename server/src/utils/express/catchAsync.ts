import { Request, Response, NextFunction } from 'express';

type AsyncFucntionMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const catchAsync = (fn: AsyncFucntionMiddleware) => {
	return (req: Request, res: Response, next: NextFunction) => {
		fn(req, res, next).catch((err: any) => next(err));
	};
};
