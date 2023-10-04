import Room from "../models/room.model";
import Task from "../models/task.model";
import { DeleteMemberSchemaType } from "../schema/member/deleteMember.schema";
import AppError from "../utils/appErrorClass";
import { NOT_FOUND } from "../utils/constants";

export const deleteMember = async (payload: DeleteMemberSchemaType) => {
  const { memberId, roomId } = payload;

  const room = await Room.findOne({ _id: roomId });

  if (!room) {
    throw new AppError("Room not found", NOT_FOUND);
  }

  await Task.deleteMany({ userId: memberId });

  // Delete the member from the room's family members.
  room.familyMembers = room.familyMembers.filter((userId) => {
    return userId.toString() !== memberId;
  });

  await room.save();
};
