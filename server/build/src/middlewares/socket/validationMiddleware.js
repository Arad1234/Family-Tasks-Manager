"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMiddleware = void 0;
const deleteMember_schema_1 = require("../../schema/member/deleteMember.schema");
const createRoom_schema_1 = require("../../schema/room/createRoom.schema");
const deleteRoom_schema_1 = require("../../schema/room/deleteRoom.schema");
const joinRoom_schema_1 = require("../../schema/room/joinRoom.schema");
const createTaskSchema_1 = require("../../schema/task/createTaskSchema");
const validateSchema_1 = __importDefault(require("../../utils/validateSchema"));
const validateMiddleware = (packet, next) => {
    const [event, ...args] = packet;
    const [data] = args;
    console.log(event);
    console.log(data);
    switch (event) {
        case "rooms:create":
            (0, validateSchema_1.default)(createRoom_schema_1.createRoomSchema, data, next);
            break;
        case "rooms:delete":
            (0, validateSchema_1.default)(deleteRoom_schema_1.deleteRoomSchema, data, next);
            break;
        case "rooms:join":
            (0, validateSchema_1.default)(joinRoom_schema_1.joinRoomSchema, data, next);
            break;
        case "tasks:create":
            (0, validateSchema_1.default)(createTaskSchema_1.createTaskSchema, data, next);
            break;
        case "members:delete":
            (0, validateSchema_1.default)(deleteMember_schema_1.deleteMemberSchema, data, next);
            break;
        default:
            next();
    }
};
exports.validateMiddleware = validateMiddleware;
