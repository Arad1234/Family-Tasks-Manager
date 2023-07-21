import { Socket } from "socket.io";

export const socketErrorHandler = (socket: Socket) => {
  // If the middleware call "next(error)" it will automatically be handled by this event listener.
  socket.on("error", (err) => {
    console.log(err);
    // I have "error" event listener in the client.
    socket.emit("error", err);
  });
};
