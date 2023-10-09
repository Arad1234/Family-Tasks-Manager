import { socket } from "../socket";

export const removeErrorListeners = () => {
  socket.off("error");
  socket.off("connect_error");
};
