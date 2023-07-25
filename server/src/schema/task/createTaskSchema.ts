import { TypeOf, date, object, string } from "zod";

export const createTaskSchema = object({
  name: string({ required_error: "name is required!" }),
  description: string().optional(),
  timeToDo: date().nullable(),
  memberId: string({ required_error: "memberId is required!" }),
  roomId: string({ required_error: "roomId is required!" }),
});

export type createTaskSchemaType = TypeOf<typeof createTaskSchema>;
