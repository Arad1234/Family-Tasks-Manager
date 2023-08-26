import Room from "../models/room.model";
import Task from "../models/task.model";
import { createTaskSchemaType } from "../schema/task/createTaskSchema";

export const createTask = async (taskData: createTaskSchemaType) => {
  const { name, description, startTime, endTime, memberId, roomId } = taskData;

  const newTask = await Task.create({
    name,
    description,
    startTime,
    endTime,
  });
  const room = await Room.findOne({ _id: roomId });

  if (room) {
    room.familyMembers = room.familyMembers.map((member) => {
      if (member.userId.toString() == memberId) {
        member.tasks.push(newTask._id);
      }
      return member;
    });
  }
  await room?.save();
  return { newTask, roomId: room?._id };
};
