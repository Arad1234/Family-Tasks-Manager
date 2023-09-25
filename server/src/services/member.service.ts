import Room from "../models/room.model";
import Task from "../models/task.model";
import { DeleteMemberSchemaType } from "../schema/member/deleteMember.schema";
import AppError from "../utils/appErrorClass";
import { BAD_REQUEST, NOT_FOUND } from "../utils/constants";

export const deleteMember = async (payload: DeleteMemberSchemaType) => {
  const { memberId, roomId } = payload;

  const room = await Room.findOne({ _id: roomId });

  if (!room) {
    throw new AppError("Room not found", NOT_FOUND);
  }

  const memberToDelete = room.familyMembers.find(
    (member) => member.userId.toString() === memberId
  );

  // Delete all the tasks of the member
  if (memberToDelete && memberToDelete.tasks.length > 0) {
    memberToDelete.tasks.map(async (taskId) => {
      const taskToDelete = await Task.findOne({ _id: taskId });

      if (!taskToDelete) {
        throw new AppError(`Task with the id ${taskId} not found`, BAD_REQUEST);
      }

      await taskToDelete.deleteOne();
    });
  }

  // Delete the member from the room's family members.
  room.familyMembers = room.familyMembers.filter((member) => {
    return member.userId.toString() !== memberId;
  });

  await room.save();
};
