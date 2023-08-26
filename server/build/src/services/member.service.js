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
exports.deleteMember = void 0;
const room_model_1 = __importDefault(require("../models/room.model"));
const task_model_1 = __importDefault(require("../models/task.model"));
const deleteMember = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { memberId, roomId } = payload;
    try {
        const room = yield room_model_1.default.findOne({ _id: roomId });
        const memberToDelete = room === null || room === void 0 ? void 0 : room.familyMembers.find((member) => member.userId.toString() === memberId);
        // Delete all the tasks of the member
        if (memberToDelete && memberToDelete.tasks.length > 0) {
            memberToDelete.tasks.map((taskId) => __awaiter(void 0, void 0, void 0, function* () {
                const taskToDelete = yield task_model_1.default.findOne({ _id: taskId });
                yield (taskToDelete === null || taskToDelete === void 0 ? void 0 : taskToDelete.deleteOne());
            }));
        }
        // Delete the member from the room's family members.
        if (room) {
            room.familyMembers = room.familyMembers.filter((member) => {
                return member.userId.toString() !== memberId;
            });
        }
        yield (room === null || room === void 0 ? void 0 : room.save());
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.deleteMember = deleteMember;
