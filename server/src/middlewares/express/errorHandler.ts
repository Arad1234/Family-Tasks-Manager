import { Request, Response, NextFunction } from "express";
import { INTERNAL_SERVER_ERROR } from "../../utils/constants";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let errorMessage;
  if (error.message.includes("11000")) {
    errorMessage = "Email already exists!";
  } else {
    errorMessage = error.message;
  }
  res.status(INTERNAL_SERVER_ERROR).json({ error: errorMessage });
};
