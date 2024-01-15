import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import validateSchema from '../../utils/validateSchema';

const expressValidationSchema = (schema: ZodSchema) => (req: Request, _res: Response, next: NextFunction) => {
	validateSchema(schema, req.body, next);
};

export default expressValidationSchema;
