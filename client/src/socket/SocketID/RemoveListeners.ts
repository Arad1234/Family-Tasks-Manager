import { socket } from "../socket";

const removeSocketIDListeners = () => {
  socket.off("removedFromRoom");
};

export default removeSocketIDListeners;
