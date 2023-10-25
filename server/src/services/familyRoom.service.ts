import Room from "../models/room.model";
import Task from "../models/task.model";
import User from "../models/user.model";
import { DeleteMemberSchemaType } from "../schema/member/deleteMember.schema";
import AppError from "../utils/appErrorClass";
import { NOT_FOUND } from "../utils/constants";

export const deleteMember = async (payload: DeleteMemberSchemaType) => {
  const { memberId, roomId } = payload;

  const userToDelete = await User.findById(memberId);

  if (!userToDelete) {
    throw new AppError("User not found", NOT_FOUND);
  }

  const room = await Room.findOne({ _id: roomId });

  if (!room) {
    throw new AppError("Room not found", NOT_FOUND);
  }

  await Task.deleteMany({ userId: memberId });

  // Delete the member from the room's family members.
  room.familyMembers = room.familyMembers.filter((member) => {
    return member.userId.toString() !== memberId;
  });

  await room.save();

  return { username: userToDelete.username, roomName: room.roomName };
};

export const getMemberRooms = async (userId: string) => {
  const memberRooms = await Room.find({
    familyMembers: { $elemMatch: { userId } },
  }).select("roomName");

  return memberRooms;
};

export const getCurrentRoom = async (roomId: string) => {
  // Populate the and the user tasks ref that match the current roomId.
  const currentRoom = await Room.findOne({ _id: roomId }).populate(
    "familyMembers.tasks"
  );

  if (!currentRoom) {
    throw new AppError(`Room with id ${roomId} not found`, NOT_FOUND);
  }

  return currentRoom;
};
