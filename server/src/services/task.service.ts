import Task from "../models/task.model";
import User from "../models/user.model";
import { createTaskSchemaType } from "../schema/task/createTaskSchema";
import AppError from "../utils/appErrorClass";
import { NOT_FOUND } from "../utils/constants";

export const createTask = async (taskData: createTaskSchemaType) => {
  const { name, description, startTime, endTime, userId, roomId } = taskData;

  const newTask = await Task.create({
    name,
    description,
    startTime,
    endTime,
    roomId,
  });

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new AppError(`User with id ${userId} not found`, NOT_FOUND);
  }

  user.tasks.push(newTask._id);

  await user.save();

  return newTask;
};
