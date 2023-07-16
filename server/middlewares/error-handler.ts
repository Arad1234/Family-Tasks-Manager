import { Request, Response, ErrorRequestHandler, NextFunction } from "express";
import { INTERNAL_SERVER_ERROR } from "../utils/constants";

export const errorHandler = (
  error: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  res.status(INTERNAL_SERVER_ERROR).json({ error: error });
};
