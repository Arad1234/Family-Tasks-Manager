import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import validateSchema from "../../utils/validateSchema";

// This function validates the zod schema whenever the user want to access/change/add a resource.
const expressValidationSchema =
  (schema: ZodSchema) => (req: Request, _res: Response, next: NextFunction) => {
    validateSchema(schema, req.body, next);
  };

export default expressValidationSchema;
