"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskSchema = void 0;
const mongoose_1 = require("mongoose");
exports.taskSchema = new mongoose_1.Schema({
    name: String,
    description: String,
    startTime: Date,
    endTime: Date,
}, { versionKey: false, timestamps: true });
const Task = (0, mongoose_1.model)("Task", exports.taskSchema);
exports.default = Task;
