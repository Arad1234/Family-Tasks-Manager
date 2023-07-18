import Room from "../models/room.model";
import { RoomData } from "../types/common";

export const getFamilyRooms = async () => {
  try {
    const rooms = await Room.find();
    return rooms;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createFamilyRoom = async (roomData: RoomData) => {
  const { username, maxMembers, roomName, userId } = roomData;
  try {
    const newRoom = await Room.create({
      roomName: roomName,
      maxMembers: maxMembers,
      creator: username,
      familyMembers: [username],
      userId: userId,
    });

    return newRoom;
  } catch (error: any) {
    throw new Error(error);
  }
};
