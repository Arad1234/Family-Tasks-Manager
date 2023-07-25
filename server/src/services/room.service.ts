import Room from "../models/room.model";
import { RoomData } from "../types/common";
import { JoinRoomPayload } from "../types/socket";

export const getFamilyRooms = async () => {
  try {
    const rooms = await Room.find();

    const newRooms = [];

    for (const room of rooms) {
      newRooms.push(room.removePasswordProp());
    }

    return newRooms;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createFamilyRoom = async (roomData: RoomData) => {
  const { username, maxMembers, roomName, roomPassword, userId } = roomData;

  try {
    const newRoom = await Room.create({
      roomName,
      maxMembers,
      familyMembers: [{ userId: userId, username: username, tasks: [] }],
      creator: { userId, username },
      roomPassword,
    });

    const updatedNewRoom = newRoom.removePasswordProp();

    return updatedNewRoom;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteFamilyRoom = async (roomId: string) => {
  try {
    const room = await Room.findOne({ _id: roomId });
    await room?.deleteOne();
    return room?._id;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const joinFamilyRoom = async (joinRoomData: JoinRoomPayload) => {
  const { roomId, userId, username, roomPassword } = joinRoomData;

  try {
    const room = await Room.findOne({ _id: roomId });
    const isPasswordValid = await room?.validatePassword(roomPassword);

    if (isPasswordValid) {
      room?.familyMembers.push({
        userId,
        username,
        tasks: [],
      });

      await room?.save();

      return { room, username, userId };
    } else {
      throw new Error("Room password is not correct!");
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
