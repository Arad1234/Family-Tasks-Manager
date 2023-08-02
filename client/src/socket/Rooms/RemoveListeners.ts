import { Socket } from "socket.io-client";

export const removeRoomsListeners = (socket: Socket) => {
  socket.off("createdRoom");
  socket.off("recievedRooms");
  socket.off("deletedRoom");
};
