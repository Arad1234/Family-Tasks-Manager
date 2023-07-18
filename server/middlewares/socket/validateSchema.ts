import { ZodSchema } from "zod";

export const validateResource = (
  schema: ZodSchema,
  data: any,
  next: Function
) => {
  console.log(data);
  try {
    schema.parse(data);
    next();
  } catch (error: any) {
    next(error);
  }
};
