import { Socket } from "socket.io-client";

export const removeCommonListeners = (socket: Socket) => {
  socket.off("memberDeletedByAdmin");
  socket.off("joinedRoom");
  socket.off("userLeftRoom");
};
