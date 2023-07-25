import { Server, Socket } from "socket.io";
import http from "http";
import { Application } from "express";
import { roomHandler } from "./src/controllers/room.controller";
import { verifyToken } from "./src/middlewares/socket/verifyToken";
import { taskHandler } from "./src/controllers/task.controller";
import { validateMiddleware } from "./src/middlewares/socket/validationMiddleware";

export const connectSocketServer = (app: Application) => {
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: { origin: "http://localhost:5173", credentials: true },
  });

  io.listen(4000);

  io.use(verifyToken).on("connection", onConnection);

  function onConnection(socket: Socket) {
    console.log("user connected!");

    // The "validateMiddleware" middleware is used to validate the data sent from the client, the validation is handled by zod schema.
    socket.use(validateMiddleware);

    roomHandler(io, socket);
    taskHandler(io, socket);
  }
};
