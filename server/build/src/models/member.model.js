"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberSchema = void 0;
const mongoose_1 = require("mongoose");
exports.memberSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "users" },
    username: String,
    tasks: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Task" }],
}, { _id: false });
const Member = (0, mongoose_1.model)("Member", exports.memberSchema);
exports.default = Member;
