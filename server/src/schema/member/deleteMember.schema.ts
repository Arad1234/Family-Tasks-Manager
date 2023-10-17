import { TypeOf, literal, object, string, union } from "zod";

export const deleteMemberSchema = object({
  memberId: string({ required_error: "memberId is required!" }),
  roomId: string({ required_error: "roomId is required!" }),
  source: union([literal("admin"), literal("self")]),
});

export type DeleteMemberSchemaType = TypeOf<typeof deleteMemberSchema>;
