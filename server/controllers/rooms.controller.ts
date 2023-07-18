import { validateResource } from "../middlewares/socket/validateSchema";
import { createRoomSchema } from "../schema/room.schema";
import { createFamilyRoom, getFamilyRooms } from "../services/room.service";
import { Socket, Server } from "socket.io";

export const roomHandler = (io: Server, socket: Socket) => {
  const getFamilyRoomsHandler = async function () {
    try {
      const rooms = await getFamilyRooms();
      socket.emit("recievedRooms", rooms);
    } catch (error: any) {
      console.log("Aradarad");
      socket.emit("error", error.message);
    }
  };

  const createRoomHandler = async function (payload: {
    roomName: string;
    maxMembers: number;
  }) {
    const { username, userId } = (socket as any).user;
    const { roomName, maxMembers } = payload;
    try {
      const newRoom = await createFamilyRoom({
        username,
        roomName,
        maxMembers,
        userId,
      });
      socket.emit("createdRoom", newRoom);
    } catch (error) {
      socket.emit("error", error);
    }
  };

  socket.use(([event, ...args], next: Function) => {
    const [data] = args;
    if (event === "rooms:create") {
      validateResource(createRoomSchema, data, next);
    } else {
      next();
    }
  });
  socket.on("rooms:create", createRoomHandler);
  socket.on("rooms:read", getFamilyRoomsHandler);

  // If the middleware call next(error) it will automatically be handled by this event listener.
  socket.on("error", (err) => {
    // I have "error" event listener in the client.
    socket.emit("error", err);
  });
};
