"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectSocketServer = void 0;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const room_controller_1 = require("./src/controllers/room.controller");
const verifyToken_1 = require("./src/middlewares/socket/verifyToken");
const task_controller_1 = require("./src/controllers/task.controller");
const validationMiddleware_1 = require("./src/middlewares/socket/validationMiddleware");
const member_controller_1 = require("./src/controllers/member.controller");
const connectSocketServer = (app) => {
    const server = http_1.default.createServer(app);
    const io = new socket_io_1.Server(server, {
        cors: { origin: "http://localhost:4173", credentials: true },
    });
    io.listen(4000);
    io.use(verifyToken_1.verifyToken).on("connection", onConnection);
    function onConnection(socket) {
        console.log("user connected!");
        // The "validateMiddleware" middleware is used to validate the data sent from the client, the validation is handled by zod schema.
        socket.use(validationMiddleware_1.validateMiddleware);
        (0, room_controller_1.roomHandler)(io, socket);
        (0, member_controller_1.memberHandler)(io, socket);
        (0, task_controller_1.taskHandler)(io, socket);
    }
};
exports.connectSocketServer = connectSocketServer;
