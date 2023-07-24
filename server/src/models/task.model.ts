import mongoose from "mongoose";
import { createTaskSchemaType } from "../schema/task/createTaskSchema";

export const taskSchema = new mongoose.Schema<createTaskSchemaType>(
  {
    name: String,
    description: String,
    timeToDo: Date,
  },
  { versionKey: false, timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
