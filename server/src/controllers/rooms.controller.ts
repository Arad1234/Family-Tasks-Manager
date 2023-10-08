import {
  createFamilyRoom,
  deleteFamilyRoom,
  getFamilyRooms,
  joinFamilyRoom,
} from "../services/rooms.service";
import { Socket, Server } from "socket.io";
import { JoinRoomSchemaType } from "../schema/room/joinRoom.schema";
import { CreateRoomSchemaType } from "../schema/room/createRoom.schema";
import { DeleteRoomSchemaType } from "../schema/room/deleteRoom.schema";
import { catchAsyncSocket } from "../utils/socket/catchAsyncSocket";

export const roomsHandler = (io: Server, socket: Socket) => {
  const getFamilyRoomsHandler = catchAsyncSocket(async function () {
    const rooms = await getFamilyRooms();

    socket.emit("recievedRooms", rooms);
  }, socket);

  const createRoomHandler = catchAsyncSocket(async function (
    payload: CreateRoomSchemaType
  ) {
    const { username, userId } = socket.data.user;
    const { roomName, maxMembers, roomPassword } = payload;

    const newRoom = await createFamilyRoom({
      username,
      roomName,
      maxMembers,
      roomPassword,
      userId,
    });

    socket.join(String(newRoom._id));
    // Emit the event to all connected users except for the one who emit the event.
    socket.broadcast.emit("createdRoom", newRoom);

    // Emit the event to the one who emitted the event (current user).
    socket.emit("createdRoom", { ...newRoom, isCreator: true });
  },
  socket);

  const deleteRoomHandler = catchAsyncSocket(async function (
    payload: DeleteRoomSchemaType
  ) {
    const { roomId } = payload;
    const deletedRoomId = await deleteFamilyRoom(roomId);

    socket.broadcast.emit("deletedRoom", { deletedRoomId });
    socket.emit("deletedRoom", { deletedRoomId, isDeleter: true });
  },
  socket);

  const joinRoomHandler = catchAsyncSocket(async function (
    payload: JoinRoomSchemaType
  ) {
    const { roomId, roomPassword } = payload;
    const { username, userId } = socket.data.user;
    await joinFamilyRoom({
      userId,
      roomId,
      roomPassword,
    });

    socket.join(String(roomId));

    io.to(String(roomId)).emit("joinedRoom", { roomId, username, userId });
  },
  socket);

  socket.on("rooms:create", createRoomHandler);
  socket.on("rooms:delete", deleteRoomHandler);
  socket.on("rooms:join", joinRoomHandler);
  socket.on("rooms:read", getFamilyRoomsHandler);
};
