import Room from "../models/room.model";
import Task from "../models/task.model";
import { RoomData } from "../types/common";
import { JoinRoomPayload } from "../types/socket";
import { NOT_FOUND, UNAUTHORIZED } from "../utils/constants";
import AppError from "../utils/appErrorClass";

export const getFamilyRooms = async () => {
  const rooms = await Room.find()

  return rooms;
};

export const createFamilyRoom = async (roomData: RoomData) => {
  const { username, maxMembers, roomName, roomPassword, userId } = roomData;

  const newRoom = await Room.create({
    roomName,
    maxMembers,
    familyMembers: [userId],
    creator: { userId, username },
    roomPassword,
  });

  const roomWithoutRoomPassword = newRoom.toJSON();

  return roomWithoutRoomPassword;
};

export const deleteFamilyRoom = async (roomId: string) => {
  const room = await Room.findById({ _id: roomId });

  if (!room) {
    throw new AppError("Room not found", NOT_FOUND);
  }
  // Delete all the tasks of the members in this room.
  room.familyMembers.map(async (userId) => {
    const userTasks = await Task.find({ userId });
    userTasks.map(async (task) => {
      await Task.findByIdAndDelete(task._id);
    });
  });

  await room.deleteOne();

  return room._id;
};

export const joinFamilyRoom = async (joinRoomData: JoinRoomPayload) => {
  const { roomId, userId, roomPassword } = joinRoomData;

  const room = await Room.findOne({ _id: roomId }).select("+roomPassword");

  if (!room) {
    throw new AppError("Room not found", NOT_FOUND);
  }
  const isPasswordValid = await room.validatePassword(roomPassword);

  if (!isPasswordValid) {
    throw new AppError("Room password is not correct!", UNAUTHORIZED);
  }

  room.familyMembers.push(Object(userId));

  await room.save();
};