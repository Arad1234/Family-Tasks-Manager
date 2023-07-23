import Room from "../models/room.model";
import User from "../models/user.model";
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
      roomName: roomName,
      maxMembers: maxMembers,
      creator: username,
      familyMembers: [{ username, userId }],
      roomPassword: roomPassword,
      userId: userId,
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
    return room;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const joinFamilyRoom = async (joinRoomData: JoinRoomPayload) => {
  const { roomId, userId, roomPassword } = joinRoomData;

  try {
    const room = await Room.findOne({ _id: roomId });
    const isPasswordValid = await room?.validatePassword(roomPassword);

    if (isPasswordValid) {
      const user = await User.findOne({ _id: userId });

      room?.familyMembers.push({
        username: user?.username as string,
        userId: user?._id,
      });
      await room?.save();

      return { room: room, username: user?.username, userId: user?._id };
    } else {
      throw new Error("Room password is not correct!");
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
