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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const member_model_1 = require("./member.model");
// Single room schema
const roomSchema = new mongoose_1.Schema({
    roomName: String,
    creator: { userId: mongoose_1.Schema.Types.ObjectId, username: String },
    familyMembers: [member_model_1.memberSchema],
    maxMembers: Number,
    roomPassword: String,
}, { versionKey: false });
// Middlewares
roomSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const room = this;
        if (room.isModified("roomPassword")) {
            try {
                const hashedPassword = yield bcrypt_1.default.hash(room.roomPassword, 10);
                this.roomPassword = hashedPassword;
                next();
            }
            catch (error) {
                next(error);
            }
        }
        else {
            next();
        }
    });
});
// Methods
roomSchema.methods.validatePassword = function (roomPasword) {
    return __awaiter(this, void 0, void 0, function* () {
        const isPasswordValid = yield bcrypt_1.default.compare(roomPasword, this.roomPassword);
        return isPasswordValid;
    });
};
roomSchema.methods.removePasswordProp = function () {
    const doc = this.toObject();
    delete doc.roomPassword;
    return doc;
};
const Room = (0, mongoose_1.model)("Room", roomSchema);
exports.default = Room;
