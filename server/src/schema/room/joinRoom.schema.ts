import { string, object, TypeOf } from "zod";

export const joinRoomSchema = object({
  roomId: string({ required_error: "RoomId is required!" }),

  roomPassword: string({ required_error: "roomPassword is required!" }),
});

export type JoinRoomSchemaType = TypeOf<typeof joinRoomSchema>;
