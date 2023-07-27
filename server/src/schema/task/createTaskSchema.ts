import { TypeOf, date, object, string } from "zod";

export const createTaskSchema = object({
  name: string({ required_error: "name is required!" }).min(
    5,
    "Task name must be at least 5 chars!"
  ),
  description: string().optional(),
  // Transforming the time from string to date.
  timeToDo: string()
    .nullable()
    .transform((arg) => arg && new Date(arg)),
  memberId: string({ required_error: "memberId is required!" }),
  roomId: string({ required_error: "roomId is required!" }),
});

export type createTaskSchemaType = TypeOf<typeof createTaskSchema>;
