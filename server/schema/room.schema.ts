import mongoose from "mongoose";
import { string, object, number, array, TypeOf, custom } from "zod";

export const createRoomSchema = object({
  roomName: string({
    required_error: "Room name is required!",
    invalid_type_error: "Room name must be a string!",
  }).min(2, "The name should be at least 2 chars!"),
  creator: object({
    _id: custom<mongoose.Types.ObjectId>(),
  }),
  familyMembers: array(
    object({
      _id: custom<mongoose.Types.ObjectId>(),
    })
  ),
  maxMembers: number({ required_error: "Max members is required!" }).max(
    10,
    "Max members can be up to 10 people!"
  ),
});

export type CreateRoomType = TypeOf<typeof createRoomSchema>;
