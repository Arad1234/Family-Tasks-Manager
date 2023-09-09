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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinFamilyRoom = exports.deleteFamilyRoom = exports.createFamilyRoom = exports.getFamilyRooms = void 0;
const member_model_1 = __importDefault(require("../models/member.model"));
const room_model_1 = __importDefault(require("../models/room.model"));
const getFamilyRooms = () => __awaiter(void 0, void 0, void 0, function* () {
    // Getting the rooms with the tasks for each family member already populated.
    // Note the the DB does not populate with the tasks in the "rooms" collection.
    const rooms = yield room_model_1.default.find().populate("familyMembers.tasks");
    const newRooms = [];
    for (const room of rooms) {
        newRooms.push(room.removePasswordProp());
    }
    return newRooms;
});
exports.getFamilyRooms = getFamilyRooms;
const createFamilyRoom = (roomData) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, maxMembers, roomName, roomPassword, userId } = roomData;
    const member = new member_model_1.default({ userId, username, tasks: [] });
    const newRoom = yield room_model_1.default.create({
        roomName,
        maxMembers,
        familyMembers: [member],
        creator: { userId, username },
        roomPassword,
    });
    const updatedNewRoom = newRoom.removePasswordProp();
    return updatedNewRoom;
});
exports.createFamilyRoom = createFamilyRoom;
const deleteFamilyRoom = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield room_model_1.default.findOne({ _id: roomId });
    yield (room === null || room === void 0 ? void 0 : room.deleteOne());
    return room === null || room === void 0 ? void 0 : room._id;
});
exports.deleteFamilyRoom = deleteFamilyRoom;
const joinFamilyRoom = (joinRoomData) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId, userId, username, roomPassword } = joinRoomData;
    const room = yield room_model_1.default.findOne({ _id: roomId });
    const isPasswordValid = yield (room === null || room === void 0 ? void 0 : room.validatePassword(roomPassword));
    if (isPasswordValid) {
        // Member instance according to type configuration.
        const member = new member_model_1.default({ userId, username, tasks: [] });
        room === null || room === void 0 ? void 0 : room.familyMembers.push(member);
        yield (room === null || room === void 0 ? void 0 : room.save());
    }
    else {
        throw new Error("Room password is not correct!");
    }
});
exports.joinFamilyRoom = joinFamilyRoom;
