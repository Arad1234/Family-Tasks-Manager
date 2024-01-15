import { ZodSchema } from 'zod';
import AppError from './appErrorClass';
import { BAD_REQUEST } from './constants';

const validateSchema = (schema: ZodSchema, data: any, next: Function) => {
	try {
		schema.parse(data);
		next();
	} catch (error: any) {
		let errorMessage = 'Invalid Data';

		if (error.name === 'ZodError') {
			const [firstErrorObj] = error.issues;
			errorMessage = firstErrorObj.message;
		}

		next(new AppError(errorMessage, BAD_REQUEST));
	}
};

export default validateSchema;
