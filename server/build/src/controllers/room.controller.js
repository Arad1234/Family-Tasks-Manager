"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomHandler = void 0;
const room_service_1 = require("../services/room.service");
const errorHandler_1 = require("../middlewares/socket/errorHandler");
const catchAsyncSocket_1 = require("../utils/socket/catchAsyncSocket");
const roomHandler = (io, socket) => {
    const getFamilyRoomsHandler = (0, catchAsyncSocket_1.catchAsyncSocket)(function () {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getting rooms!");
            const rooms = yield (0, room_service_1.getFamilyRooms)();
            socket.emit("recievedRooms", rooms);
        });
    }, socket);
    const createRoomHandler = (0, catchAsyncSocket_1.catchAsyncSocket)(function (payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, userId } = socket.user;
            const { roomName, maxMembers, roomPassword } = payload;
            const newRoom = yield (0, room_service_1.createFamilyRoom)({
                username,
                roomName,
                maxMembers,
                roomPassword,
                userId,
            });
            // Emitting the event to all connected users.
            io.emit("createdRoom", newRoom);
        });
    }, socket);
    const deleteRoomHandler = (0, catchAsyncSocket_1.catchAsyncSocket)(function (payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { roomId } = payload;
            const deletedRoomId = yield (0, room_service_1.deleteFamilyRoom)(roomId);
            // Emitting the event to all connected users.
            io.emit("deletedRoom", deletedRoomId);
        });
    }, socket);
    const joinRoomHandler = (0, catchAsyncSocket_1.catchAsyncSocket)(function (payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { roomId, roomPassword } = payload;
            const { username, userId } = socket.user;
            yield (0, room_service_1.joinFamilyRoom)({
                username,
                userId,
                roomId,
                roomPassword,
            });
            io.emit("joinedRoom", { roomId, username, userId });
        });
    }, socket);
    socket.on("rooms:create", createRoomHandler);
    socket.on("rooms:delete", deleteRoomHandler);
    socket.on("rooms:join", joinRoomHandler);
    socket.on("rooms:read", getFamilyRoomsHandler);
    (0, errorHandler_1.socketErrorHandler)(socket);
};
exports.roomHandler = roomHandler;
