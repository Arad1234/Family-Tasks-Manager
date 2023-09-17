import { INTERNAL_SERVER_ERROR } from "../../../utils/constants";
import { Socket } from "socket.io";
import {
  handleCastErrorDB,
  handleDuplicateFieldsDB,
  handleValidationErrorDB,
} from "../../errorHandlerFunctions";

// Send error details in development or production.
const sendErrorDev = (err: any, socket: Socket) => {
  socket.emit("error", {
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: any, socket: Socket) => {
  // Operational, trusted error: send message to the user.
  if (err.isOperational) {
    socket.emit("error", {
      status: err.status,
      message: err.message,
    });
  }
  // Programming or other unkown error: don't leak error details.
  else {
    // 1) Log error
    console.error("ERROR 💥", err);

    // 2) Send generic message
    socket.emit("error", {
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

// Socket error middleware.
export const socketErrorHandler = (err: any, socket: Socket) => {
  err.statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
  err.status = err.status || "error";

  if (process.env.NODE_ENV?.trim() === "development") {
    sendErrorDev(err, socket);
  } else if (process.env.NODE_ENV?.trim() === "production") {
    // The "message" and "name" properties of an object is by default non-enumerable so it cannot be iterable and copied, now it can be because of the defineProperties method.
    Object.defineProperties(err, {
      message: {
        value: err.message,
        enumerable: true,
      },
      name: {
        value: err.name,
        enumerable: true,
      },
    });

    let error = { ...err }; // It's a good practice to copy the original "err" object and to not change him directly.

    if (error.name === "CastError") error = handleCastErrorDB(error);

    if (error.code === 11000) error = handleDuplicateFieldsDB(error);

    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);

    sendErrorProd(error, socket);
  }
};
