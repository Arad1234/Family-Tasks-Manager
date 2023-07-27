import { Schema, model } from "mongoose";
import { ITask } from "../types/mongoose";

export const taskSchema = new Schema<ITask>(
  {
    name: String,
    description: String,
    timeToDo: Date,
  },
  { versionKey: false, timestamps: true }
);

const Task = model("Task", taskSchema);

export default Task;
