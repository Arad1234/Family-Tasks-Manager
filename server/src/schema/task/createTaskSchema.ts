import { TypeOf, object, string } from 'zod';

export const createTaskSchema = object({
	name: string({ required_error: 'name is required!' }).min(5, 'Task name must be at least 5 chars!'),

	description: string().optional(),

	// Transform the time from string to date.
	startTime: string()
		.optional()
		.transform((arg) => arg && new Date(arg)),

	endTime: string()
		.optional()
		.transform((arg) => arg && new Date(arg)),

	userId: string({ required_error: 'userId is required!' }),

	roomId: string({ required_error: 'roomId is required!' }),
}).refine((schema) => (schema.startTime && schema.endTime ? schema.startTime <= schema.endTime : true), {
	message: 'Start Time must be smaller than End Time!',
});

export type createTaskSchemaType = TypeOf<typeof createTaskSchema>;
