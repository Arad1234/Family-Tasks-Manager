import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodSchema } from "zod";

const { BAD_REQUEST } = StatusCodes;

// This function validates the zod schema whenever the user want to access/change/add a resource.
const validateResource =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      schema.parse(req.body);
      next();
    } catch (error: any) {
      return res.status(BAD_REQUEST).json({ error: error });
    }
  };

export default validateResource;
