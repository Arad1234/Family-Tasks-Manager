import { Socket } from "socket.io-client";

export const removeSocketListeners = (socket: Socket) => {
  socket.off("createdRoom");
  socket.off("recievedRooms");
  socket.off("deletedRoom");
  socket.off("joinedRoom");
  socket.off("error");
  socket.off("connect_error");
};
