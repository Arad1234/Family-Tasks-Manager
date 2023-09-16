import { Request, Response, NextFunction } from "express";
import { INTERNAL_SERVER_ERROR } from "../../utils/constants";

export const expressErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  err.statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
  err.status = err.status || "error";

  res.status(err.statusCode).json({ status: err.status, message: err.message });
};
