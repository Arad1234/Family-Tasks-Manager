import AppError from "./appErrorClass";
import { BAD_REQUEST } from "./constants";

// DB errors
export const handleCastErrorDB = (err: any) => {
  console.log(err);
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, BAD_REQUEST);
};

export const handleDuplicateFieldsDB = (err: any) => {
  // Regex for finding the field that was duplicated.
  const values = err.message.match(/(["'])(\\?.)*?\1/);
  const duplicatedValue = values[0];

  const message = `Duplicate value: ${duplicatedValue}. Please choose another value!`;

  return new AppError(message, BAD_REQUEST);
};

export const handleValidationErrorDB = (err: any) => {
  const errorsMessage = Object.values(err.errors).map(
    (errorValue: any) => errorValue.message
  );

  const message = `Invalid Input data. ${errorsMessage.join(". ")}`;
  return new AppError(message, BAD_REQUEST);
};
