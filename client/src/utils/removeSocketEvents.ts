import { Socket } from "socket.io-client";

export const removeErrorSocket = (socket: Socket) => {
  socket.off("error");
  socket.off("connect_error");
};
