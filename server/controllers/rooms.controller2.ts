import { createFamilyRoom, getFamilyRooms } from "../services/room.service";
import { Socket, Server } from "socket.io";

export const roomHandler = (io: Server, socket: Socket) => {
  const getFamilyRoomsHandler = async function () {
    try {
      const rooms = await getFamilyRooms();
      socket.emit("recievedRooms", rooms);
    } catch (error) {
      socket.emit("error", error);
    }
  };

  const createRoomHandler = async function (payload: {
    roomName: string;
    maxMembers: number;
  }) {
    const { userId } = (socket as any).user;
    const { roomName, maxMembers } = payload;
    try {
      const newRoom = await createFamilyRoom({ userId, roomName, maxMembers });
      socket.emit("createdRoom", newRoom);
    } catch (error) {
      socket.emit("error", error);
    }
  };
  socket.on("rooms:read", getFamilyRoomsHandler);
  socket.on("rooms:create", createRoomHandler);
};
