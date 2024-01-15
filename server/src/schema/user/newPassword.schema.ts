import { TypeOf, object, string } from 'zod';

export const newPasswordValidationSchema = object({
	newPassword: string({ required_error: 'New Password is required!' }).min(6, 'Password must be at least 6 chars!'),
	confirmPassword: string({ required_error: 'Confirm Password is required!' }),
}).refine((data) => data.newPassword === data.confirmPassword, {
	message: "Passwords don't match!",
	path: ['confirmPassword'],
});

export type createNewPasswordSchemaType = Omit<TypeOf<typeof newPasswordValidationSchema>, 'confirmPassword'>;
