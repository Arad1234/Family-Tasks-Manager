import { Request, Response, NextFunction } from "express";
import { INTERNAL_SERVER_ERROR } from "../../utils/constants";
import {
  handleCastErrorDB,
  handleDuplicateFieldsDB,
  handleValidationErrorDB,
} from "../../utils/errorHandlerFunctions";

// Send error details in development or production.
const sendErrorDev = (err: any, res: Response) => {
  console.log(err);
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: any, res: Response) => {
  // Operational, trusted error: send message to the user.
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // Programming or other unkown error: don't leak error details.
  else {
    // 1) Log error
    console.error("ERROR 💥", err);

    // 2) Send generic message
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ status: "error", message: "Something went very wrong!" });
  }
};

// Express error middleware.
export const expressErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  err.statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
  err.status = err.status || "error";

  if (process.env.NODE_ENV?.trim() === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV?.trim() === "production") {
    // The "message" property of an object is by default non-enumerable so it cannot be iterable and copied, now it can be because of the defineProperty.
    Object.defineProperty(err, "message", {
      value: err.message,
      enumerable: true,
    });

    let error = { ...err }; // It's a good practice to copy the original "err" object and to not change him directly.

    if (error.name === "CastError") error = handleCastErrorDB(error);

    if (error.code === 11000) error = handleDuplicateFieldsDB(error);

    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};
