import { Server, Socket } from "socket.io";
import http from "http";
import { Application } from "express";
import { roomsHandler } from "./src/controllers/rooms.controller";
import { verifyToken } from "./src/middlewares/socket/verifyToken";
import { taskHandler } from "./src/controllers/task.controller";
import { socketValidationSchema } from "./src/middlewares/socket/socketValidationSchema";
import { familyRoomHandler } from "./src/controllers/familyRoom.controller";
import { sanitizeData } from "./src/middlewares/socket/sanitizeData";
import { zodErrorHandler } from "./src/utils/socket/errorHandlers/zodErrorHandler";

export const connectSocketServer = (app: Application) => {
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: { origin: "http://localhost:4173", credentials: true },
  });

  io.use(verifyToken).on("connection", onConnection);

  function onConnection(socket: Socket) {
    console.log("user connected!");

    // The "socketValidationSchema" middleware is used to validate the data sent from the client, the validation is handled by zod schema.
    socket.use(socketValidationSchema);

    // Sanitize incoming data against NoSql query injection for every request.
    socket.use(sanitizeData);

    roomsHandler(io, socket);
    familyRoomHandler(io, socket);
    taskHandler(io, socket);

    zodErrorHandler(socket);
  }

  io.listen(4000);
};
