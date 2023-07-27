import { Socket } from "socket.io-client";

export const removeFamilyRoomListeners = (socket: Socket) => {
  socket.off("taskCreated");
};
