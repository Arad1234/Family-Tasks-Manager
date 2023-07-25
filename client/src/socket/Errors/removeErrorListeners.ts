import { Socket } from "socket.io-client";

export const removeErrorListeners = (socket: Socket) => {
  socket.off("error");
  socket.off("connect_error");
};
