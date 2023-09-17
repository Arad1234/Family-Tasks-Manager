import { Request, Response, NextFunction } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../../utils/constants";
import AppError from "../../utils/appErrorClass";

// DB errors
const handleCastErrorDB = (err: any) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, BAD_REQUEST);
};

const handleDuplicateFieldsDB = (err: any) => {
  const values = err.message.match(/(["'])(\\?.)*?\1/);
  const duplicatedValue = values[0];

  const message = `Duplicate value: ${duplicatedValue}. Please choose another value!`;

  return new AppError(message, BAD_REQUEST);
};

const handleValidationErrorDB = (err: any) => {
  const errorsMessage = Object.values(err.errors).map(
    (errorValue: any) => errorValue.message
  );

  const message = `Invalid Input data. ${errorsMessage.join(". ")}`;
  return new AppError(message, BAD_REQUEST);
};

// Send error details in development or production.
const sendErrorDev = (err: any, res: Response) => {
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
