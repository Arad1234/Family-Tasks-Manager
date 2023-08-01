import { TypeOf, object, string } from "zod";

export const deleteMemberSchema = object({
  memberId: string({ required_error: "memberId is required!" }),
  roomId: string({ required_error: "roomId is required!" }),
});

export type DeleteMemberSchemaType = TypeOf<typeof deleteMemberSchema>;
