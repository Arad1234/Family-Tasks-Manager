import { Socket } from "socket.io-client";

export const removeSocketEvents = (socket: Socket) => {
  socket.off("recievedRooms");

  socket.off("createdRoom");

  socket.off("error");

  socket.off("connect_error");

  socket.off("joinedRoom");
};
