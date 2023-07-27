import Room from "../models/room.model";
import Task from "../models/task.model";
import { createTaskSchemaType } from "../schema/task/createTaskSchema";

export const createTask = async (taskData: createTaskSchemaType) => {
  const { name, description, timeToDo, memberId, roomId } = taskData;

  try {
    // Task instance
    const newTask = new Task({ name, description, timeToDo });
    const room = await Room.findOne({ _id: roomId });

    if (room) {
      room.familyMembers = room.familyMembers.map((member) => {
        console.log(member.userId.toString());
        console.log(memberId);
        if (member.userId.toString() == memberId) {
          member.tasks.push(newTask);
        }
        return member;
      });
    }

    await room?.save();

    return newTask;
  } catch (error: any) {
    throw new Error(error);
  }
};
