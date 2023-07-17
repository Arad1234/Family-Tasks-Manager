import { Server, Socket } from "socket.io";
import http from "http";
import { Application } from "express";
import jwt from "jsonwebtoken";
import { roomHandler } from "./controllers/rooms.controller2";

export const connectSocketServer = (app: Application) => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: { origin: "http://localhost:5173", credentials: true },
  });
  io.listen(4000);

  io.use((socket, next) => {
    const { cookie } = socket.handshake.headers;
    const token = cookie?.split("=")[1];
    try {
      const userInfo = jwt.verify(
        token as string,
        process.env.SECRET_KEY as string
      );
      (socket as any).user = userInfo;
      next();
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  }).on("connection", onConnection);

  function onConnection(socket: Socket) {
    roomHandler(io, socket);
  }

  return io;
};
