import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  username: string({ required_error: "name is required!" }),
  password: string({ required_error: "password is required!" }).min(
    6,
    "Password too short - should be 6 chars minimum!"
  ),
  email: string({
    required_error: "email is required!",
  }).email("not a valid email"),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
