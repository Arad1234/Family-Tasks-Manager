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
import { catchAsyncSocket } from "../utils/socket/catchAsyncSocket";

export const roomHandler = (io: Server, socket: Socket) => {
  const getFamilyRoomsHandler = catchAsyncSocket(async function () {
    console.log("getting rooms!");
    const rooms = await getFamilyRooms();
    socket.emit("recievedRooms", rooms);
  }, socket);

  const createRoomHandler = catchAsyncSocket(async function (
    payload: CreateRoomSchemaType
  ) {
    const { username, userId } = (socket as any).user;
    const { roomName, maxMembers, roomPassword } = payload;

    const newRoom = await createFamilyRoom({
      username,
      roomName,
      maxMembers,
      roomPassword,
      userId,
    });
    // Emitting the event to all connected users.
    io.emit("createdRoom", newRoom);
  },
  socket);

  const deleteRoomHandler = catchAsyncSocket(async function (
    payload: DeleteRoomSchemaType
  ) {
    const { roomId } = payload;
    const deletedRoomId = await deleteFamilyRoom(roomId);
    // Emitting the event to all connected users.
    io.emit("deletedRoom", deletedRoomId);
  },
  socket);

  const joinRoomHandler = catchAsyncSocket(async function (
    payload: JoinRoomSchemaType
  ) {
    const { roomId, roomPassword } = payload;
    const { username, userId } = (socket as any).user;
    await joinFamilyRoom({
      username,
      userId,
      roomId,
      roomPassword,
    });
    io.emit("joinedRoom", { roomId, username, userId });
  },
  socket);

  socket.on("rooms:create", createRoomHandler);
  socket.on("rooms:delete", deleteRoomHandler);
  socket.on("rooms:join", joinRoomHandler);
  socket.on("rooms:read", getFamilyRoomsHandler);

  socketErrorHandler(socket);
};
