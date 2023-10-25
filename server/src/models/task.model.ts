import { Schema, model } from "mongoose";
import { ITask } from "../types/mongoose";

export const taskSchema = new Schema<ITask>(
  {
    name: String,
    description: String,
    startTime: Date,
    endTime: Date,
    roomId: { type: Schema.Types.ObjectId, ref: "Room" },
  },
  { versionKey: false, timestamps: true }
);

const Task = model<ITask>("Task", taskSchema);

export default Task;
