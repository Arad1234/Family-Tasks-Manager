import { validateMiddleware } from "../middlewares/socket/validationMiddleware";
import {
  createFamilyRoom,
  getFamilyRooms,
  joinFamilyRoom,
} from "../services/room.service";
import { Socket, Server } from "socket.io";
import { CreateRoomPayload, JoinRoomPayload } from "../types/socket";

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

  const createRoomHandler = async function (payload: CreateRoomPayload) {
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

  const joinRoomHandler = async (payload: JoinRoomPayload) => {
    try {
      const room = await joinFamilyRoom(payload);
      socket.emit("joinedRoom", room);
    } catch (error: any) {
      socket.emit("error", error.message);
    }
  };
  // The "validateMiddleware" middleware is used to validate the data sent from the client, the validation is handled by zod schema.
  socket.use(validateMiddleware);

  socket.on("rooms:create", createRoomHandler);
  socket.on("rooms:join", joinRoomHandler);
  socket.on("rooms:read", getFamilyRoomsHandler);

  // If the middleware call "next(error)" it will automatically be handled by this event listener.
  socket.on("error", (err) => {
    console.log(err);
    // I have "error" event listener in the client.
    socket.emit("error", err);
  });
};
