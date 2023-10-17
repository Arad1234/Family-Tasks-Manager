import { socket } from "../socket";

export const removeRoomsListeners = () => {
  socket.off("createdRoom");
  socket.off("recievedRooms");
  socket.off("deletedRoom");
};
