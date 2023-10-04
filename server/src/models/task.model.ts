import { Schema, model } from "mongoose";
import { ITask } from "../types/mongoose";

export const taskSchema = new Schema<ITask>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    name: String,
    description: String,
    startTime: Date,
    endTime: Date,
  },
  { versionKey: false, timestamps: true }
);

const Task = model("Task", taskSchema);

export default Task;
