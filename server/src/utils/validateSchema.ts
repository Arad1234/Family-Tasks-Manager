import { ZodSchema } from "zod";
import AppError from "./express/appErrorClass";
import { BAD_REQUEST } from "./constants";

const validateSchema = (schema: ZodSchema, data: any, next: Function) => {
  try {
    schema.parse(data);
    next();
  } catch (error: any) {
    let errorMessage = "Invalid Data";
    
    if (error.name === "ZodError") {
      const [firstErrorObj] = error.issues;
      console.log(firstErrorObj);
      errorMessage = firstErrorObj.message;
    }

    next(new AppError(errorMessage, BAD_REQUEST)); // This will call the "error" event listener on the server.
  }
};

export default validateSchema;
