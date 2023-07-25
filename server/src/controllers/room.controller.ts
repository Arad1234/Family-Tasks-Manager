import { validateMiddleware } from "../middlewares/socket/validationMiddleware";
import {
  createFamilyRoom,
  deleteFamilyRoom,
  getFamilyRooms,
  joinFamilyRoom,
} from "../services/room.service";
import { Socket, Server } from "socket.io";
import { JoinRoomSchemaType } from "../schema/room/joinRoom.schema";
import { CreateRoomSchemaType } from "../schema/room/createRoom.schema";
import { socketErrorHandler } from "../middlewares/socket/errorHandler";
import { DeleteRoomSchemaType } from "../schema/room/deleteRoom.schema";

export const roomHandler = (io: Server, socket: Socket) => {
  const getFamilyRoomsHandler = async function () {
    try {
      const rooms = await getFamilyRooms();
      socket.emit("recievedRooms", rooms);
    } catch (error: any) {
      console.log(error);
      socket.emit("error", error.message);
    }
  };

  const createRoomHandler = async function (payload: CreateRoomSchemaType) {
    const { username, userId } = (socket as any).user;
    const { roomName, maxMembers, roomPassword } = payload;
    try {
      const newRoom = await createFamilyRoom({
        username,
        roomName,
        maxMembers,
        roomPassword,
        userId,
      });
      // Emitting the event to all connected users.
      io.emit("createdRoom", newRoom);
    } catch (error: any) {
      console.log(error);
      socket.emit("error", error.message);
    }
  };

  const deleteRoomHandler = async (payload: DeleteRoomSchemaType) => {
    try {
      const { roomId } = payload;
      const deletedRoomId = await deleteFamilyRoom(roomId);
      // Emitting the event to all connected users.
      io.emit("deletedRoom", deletedRoomId);
    } catch (error: any) {
      socket.emit("error", error.message);
    }
  };

  const joinRoomHandler = async (payload: JoinRoomSchemaType) => {
    try {
      const { roomId, roomPassword } = payload;
      const { username, userId } = (socket as any).user;
      const { room } = await joinFamilyRoom({
        username,
        userId,
        roomId,
        roomPassword,
      });
      io.emit("joinedRoom", { room, username, userId });
    } catch (error: any) {
      socket.emit("error", error.message);
    }
  };

  socket.on("rooms:create", createRoomHandler);
  socket.on("rooms:delete", deleteRoomHandler);
  socket.on("rooms:join", joinRoomHandler);
  socket.on("rooms:read", getFamilyRoomsHandler);

  socketErrorHandler(socket);
};
