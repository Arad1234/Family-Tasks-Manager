import { object, string, TypeOf } from "zod";

export const userValidationSchema = object({
  username: string({ required_error: "name is required!" }),
  password: string({ required_error: "password is required!" }).min(
    6,
    "Password too short - should be 6 chars minimum!"
  ),
  confirmPassword: string({
    required_error: "confirmPassword is required!",
  }),
  email: string({
    required_error: "email is required!",
  }).email("not a valid email"),
}).refine((data) => data.confirmPassword === data.password, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// I dont need the "confirmPassword" field for that type.
export type CreateUserInput = Omit<
  TypeOf<typeof userValidationSchema>,
  "confirmPassword"
>;
