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
const roomHandler = (io, socket) => {
    const getFamilyRoomsHandler = function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rooms = yield (0, room_service_1.getFamilyRooms)();
                socket.emit("recievedRooms", rooms);
            }
            catch (error) {
                console.log(error);
                socket.emit("error", error.message);
            }
        });
    };
    const createRoomHandler = function (payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, userId } = socket.user;
            const { roomName, maxMembers, roomPassword } = payload;
            try {
                const newRoom = yield (0, room_service_1.createFamilyRoom)({
                    username,
                    roomName,
                    maxMembers,
                    roomPassword,
                    userId,
                });
                // Emitting the event to all connected users.
                io.emit("createdRoom", newRoom);
            }
            catch (error) {
                console.log(error);
                socket.emit("error", error.message);
            }
        });
    };
    const deleteRoomHandler = (payload) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { roomId } = payload;
            const deletedRoomId = yield (0, room_service_1.deleteFamilyRoom)(roomId);
            // Emitting the event to all connected users.
            io.emit("deletedRoom", deletedRoomId);
        }
        catch (error) {
            socket.emit("error", error.message);
        }
    });
    const joinRoomHandler = (payload) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { roomId, roomPassword } = payload;
            const { username, userId } = socket.user;
            yield (0, room_service_1.joinFamilyRoom)({
                username,
                userId,
                roomId,
                roomPassword,
            });
            io.emit("joinedRoom", { roomId, username, userId });
        }
        catch (error) {
            socket.emit("error", error.message);
        }
    });
    socket.on("rooms:create", createRoomHandler);
    socket.on("rooms:delete", deleteRoomHandler);
    socket.on("rooms:join", joinRoomHandler);
    socket.on("rooms:read", getFamilyRoomsHandler);
    (0, errorHandler_1.socketErrorHandler)(socket);
};
exports.roomHandler = roomHandler;
