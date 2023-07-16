import { string, object, number, TypeOf } from "zod";

export const createRoomSchema = object({
  roomName: string({
    required_error: "Room name is required!",
    invalid_type_error: "Room name must be a string!",
  }).min(2, "The name should be at least 2 chars!"),

  maxMembers: number({ required_error: "Max members is required!" }).max(
    10,
    "Max members can be up to 10 people!"
  ),
});

export type CreateRoomType = TypeOf<typeof createRoomSchema>;
