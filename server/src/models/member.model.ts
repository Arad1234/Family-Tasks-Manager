import { Schema, model } from "mongoose";
import { taskSchema } from "./task.model";
import { IMember } from "../types/mongoose";

export const memberSchema = new Schema<IMember>({
  userId: { type: Schema.Types.ObjectId, ref: "users" },
  username: String,
  tasks: [taskSchema],
});

const Member = model("Member", memberSchema);

export default Member;
