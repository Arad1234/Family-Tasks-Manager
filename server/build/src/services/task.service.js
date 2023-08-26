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
exports.createTask = void 0;
const room_model_1 = __importDefault(require("../models/room.model"));
const task_model_1 = __importDefault(require("../models/task.model"));
const createTask = (taskData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, startTime, endTime, memberId, roomId } = taskData;
    try {
        const newTask = yield task_model_1.default.create({
            name,
            description,
            startTime,
            endTime,
        });
        const room = yield room_model_1.default.findOne({ _id: roomId });
        if (room) {
            room.familyMembers = room.familyMembers.map((member) => {
                if (member.userId.toString() == memberId) {
                    member.tasks.push(newTask._id);
                }
                return member;
            });
        }
        yield (room === null || room === void 0 ? void 0 : room.save());
        return { newTask, roomId: room === null || room === void 0 ? void 0 : room._id };
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.createTask = createTask;
