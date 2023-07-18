import { Server, Socket } from "socket.io";
import http from "http";
import { Application } from "express";
import { roomHandler } from "./src/controllers/rooms.controller";
import { verifyToken } from "./src/middlewares/socket/verifyToken";

export const connectSocketServer = (app: Application) => {
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: { origin: "http://localhost:5173", credentials: true },
  });

  io.listen(4000);

  io.use(verifyToken).on("connection", onConnection);

  function onConnection(socket: Socket) {
    console.log("user connected!");
    roomHandler(io, socket);
  }
};
