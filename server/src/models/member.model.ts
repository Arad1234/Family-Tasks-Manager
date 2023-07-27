import { Schema, model } from "mongoose";
import { IMember } from "../types/mongoose";

export const memberSchema = new Schema<IMember>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    username: String,
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  { _id: false }
);

const Member = model("Member", memberSchema);

export default Member;
