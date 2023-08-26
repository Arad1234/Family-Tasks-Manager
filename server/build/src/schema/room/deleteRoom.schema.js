"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoomSchema = void 0;
const zod_1 = require("zod");
exports.deleteRoomSchema = (0, zod_1.object)({
    roomId: (0, zod_1.string)({ required_error: "roomId is required!" }),
});
