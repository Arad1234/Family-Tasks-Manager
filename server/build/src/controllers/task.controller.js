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
exports.taskHandler = void 0;
const task_service_1 = require("../services/task.service");
const errorHandler_1 = require("../middlewares/socket/errorHandler");
const catchAsyncSocket_1 = require("../utils/socket/catchAsyncSocket");
const taskHandler = (io, socket) => {
    const createTaskHandler = (0, catchAsyncSocket_1.catchAsyncSocket)(function (payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newTask, roomId } = yield (0, task_service_1.createTask)(payload);
            io.emit("taskCreated", { newTask, memberId: payload.memberId, roomId });
        });
    }, socket);
    socket.on("tasks:create", createTaskHandler);
    (0, errorHandler_1.socketErrorHandler)(socket);
};
exports.taskHandler = taskHandler;
