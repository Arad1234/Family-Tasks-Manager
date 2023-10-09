import { socket } from "../socket";

export const removeCommonListeners = () => {
  socket.off("memberDeletedByAdmin");
  socket.off("joinedRoom");
  socket.off("userLeftRoom");
};
