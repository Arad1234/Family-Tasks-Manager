import { TypeOf, date, object, string } from "zod";

export const createTaskSchema = object({
  name: string({ required_error: "name is required!" }),
  description: string().optional(),
  timeToDo: date().optional(),
});

export type createTaskSchemaType = TypeOf<typeof createTaskSchema>;
