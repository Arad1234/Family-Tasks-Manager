import { socket } from "../socket";

const connectionListeners = (userId: string) => {
  socket.off("disconnect");
  socket.off("connect");

  socket.on("disconnect", () => {
    console.log("User disconnected!");
  });

  socket.on("connect", () => {
    console.log("User connected!");
    socket.emit("register", userId);
  });
};

export default connectionListeners;
