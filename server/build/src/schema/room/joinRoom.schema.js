"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinRoomSchema = void 0;
const zod_1 = require("zod");
exports.joinRoomSchema = (0, zod_1.object)({
    roomId: (0, zod_1.string)({ required_error: "RoomId is required!" }),
    roomPassword: (0, zod_1.string)({ required_error: "roomPassword is required!" }),
});
