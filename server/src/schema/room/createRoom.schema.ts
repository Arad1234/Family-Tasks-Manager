import { string, object, number, TypeOf } from "zod";

export const createRoomSchema = object({
  roomName: string({
    required_error: "Room name is required!",
    invalid_type_error: "Room name must be a string!",
  }).min(2, "The name should be at least 2 chars!"),

  maxMembers: number({
    required_error: "Max members is required!",
    invalid_type_error: "Invalid members",
  })
    .max(10, "Max members can be up to 10 people!")
    .min(2, "Min members must be at least 2 people!"),

  roomPassword: string({ required_error: "Password is required!" }).min(
    6,
    "Password should be at least 6 chars!"
  ),
});

export type CreateRoomSchemaType = TypeOf<typeof createRoomSchema>;
