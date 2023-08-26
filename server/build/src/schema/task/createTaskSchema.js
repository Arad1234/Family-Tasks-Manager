"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskSchema = void 0;
const zod_1 = require("zod");
exports.createTaskSchema = (0, zod_1.object)({
    name: (0, zod_1.string)({ required_error: "name is required!" }).min(5, "Task name must be at least 5 chars!"),
    description: (0, zod_1.string)().optional(),
    // Transforming the time from string to date.
    startTime: (0, zod_1.string)()
        .nullable()
        .transform((arg) => arg && new Date(arg)),
    endTime: (0, zod_1.string)()
        .nullable()
        .transform((arg) => arg && new Date(arg)),
    memberId: (0, zod_1.string)({ required_error: "memberId is required!" }),
    roomId: (0, zod_1.string)({ required_error: "roomId is required!" }),
}).refine((schema) => schema.startTime !== null && schema.endTime !== null
    ? schema.startTime <= schema.endTime
    : true, {
    message: "Start Time must be before End Time!",
});
