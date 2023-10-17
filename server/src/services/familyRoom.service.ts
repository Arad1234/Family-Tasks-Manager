import Room from "../models/room.model";
import Task from "../models/task.model";
import User from "../models/user.model";
import { DeleteMemberSchemaType } from "../schema/member/deleteMember.schema";
import AppError from "../utils/appErrorClass";
import { NOT_FOUND } from "../utils/constants";

export const deleteMember = async (payload: DeleteMemberSchemaType) => {
  const { memberId, roomId } = payload;

  const userTodelete = await User.findById(memberId);

  if (!userTodelete) {
    throw new AppError("User not found", NOT_FOUND);
  }

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

  return { username: userTodelete?.username, roomName: room.roomName };
};

export const getMemberRooms = async (payload: {
  roomId: string;
  userId: string;
}) => {
  const memberRooms = await Room.find({
    familyMembers: payload.userId,
  }).select("roomName");

  return memberRooms;
};

export const getCurrentRoom = async (roomId: string) => {
  // Populate the familyMembers ref and the user tasks ref that match the current roomId.
  const currentRoom = await Room.findOne({ _id: roomId }).populate({
    path: "familyMembers",
    populate: { path: "tasks", match: { roomId } },
  });

  if (!currentRoom) {
    throw new AppError(`Room with id ${roomId} not found`, NOT_FOUND);
  }

  return currentRoom;
};
