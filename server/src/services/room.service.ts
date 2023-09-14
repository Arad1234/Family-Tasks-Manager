import Member from "../models/member.model";
import Room from "../models/room.model";
import Task from "../models/task.model";
import { RoomData } from "../types/common";
import { JoinRoomPayload } from "../types/socket";

export const getFamilyRooms = async () => {
  // Getting the rooms with the tasks for each family member already populated.
  // Note the the DB does not populate with the tasks in the "rooms" collection.
  const rooms = await Room.find()
    .select("-roomPassword")
    .populate("familyMembers.tasks");

  return rooms;
};

export const createFamilyRoom = async (roomData: RoomData) => {
  const { username, maxMembers, roomName, roomPassword, userId } = roomData;

  const member = new Member({ userId, username, tasks: [] });

  const newRoom = await Room.create({
    roomName,
    maxMembers,
    familyMembers: [member],
    creator: { userId, username },
    roomPassword,
  });

  const updatedNewRoom = newRoom.toJSON();
  console.log(updatedNewRoom);
  return updatedNewRoom;
};

export const deleteFamilyRoom = async (roomId: string) => {
  const room = await Room.findOne({ _id: roomId });
  if (room) {
    // Delete all the tasks of the members in this room.
    room.familyMembers.map((member) => {
      member.tasks.map(async (taskId) => {
        await Task.findByIdAndDelete(taskId);
      });
    });

    await room.deleteOne();
    return room._id;
  } else {
    throw new Error("Room not found");
  }
};

export const joinFamilyRoom = async (joinRoomData: JoinRoomPayload) => {
  const { roomId, userId, username, roomPassword } = joinRoomData;

  const room = await Room.findOne({ _id: roomId });
  if (room) {
    const isPasswordValid = await room.validatePassword(roomPassword);

    if (isPasswordValid) {
      // Member instance according to type configuration.
      const member = new Member({ userId, username, tasks: [] });

      room.familyMembers.push(member);

      await room.save();
    } else {
      throw new Error("Room password is not correct!");
    }
  } else {
    throw new Error("Room not found");
  }
};
