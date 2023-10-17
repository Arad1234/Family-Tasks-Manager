import { socket } from "../socket";

export const removeFamilyRoomListeners = () => {
  socket.off("taskCreated");
};
