import { TypeOf, object, string } from "zod";

export const deleteRoomSchema = object({
  roomId: string({ required_error: "roomId is required!" }),
});

export type DeleteRoomSchemaType = TypeOf<typeof deleteRoomSchema>;
