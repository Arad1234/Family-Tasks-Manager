import { Request, Response, NextFunction } from "express";
import { BAD_REQUEST } from "../../utils/constants";
import { ZodSchema } from "zod";

// This function validates the zod schema whenever the user want to access/change/add a resource.
const validateSchema =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      return res.status(BAD_REQUEST).json({ error: error });
    }
  };

export default validateSchema;
