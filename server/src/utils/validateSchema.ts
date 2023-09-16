import { ZodSchema } from "zod";

const validateSchema = (schema: ZodSchema, data: any, next: Function) => {
  try {
    schema.parse(data);
    next();
  } catch (error: any) {
    next(error); // This will call the "error" event listener on the server.
  }
};

export default validateSchema;
