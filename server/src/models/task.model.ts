import mongoose from "mongoose";
import { ITask } from "../types/mongoose";

export const taskSchema = new mongoose.Schema<ITask>(
  {
    name: String,
    description: String,
    timeToDo: Date,
  },
  { versionKey: false, timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
