"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (socket, next) => {
    const { cookie } = socket.handshake.headers;
    const token = cookie === null || cookie === void 0 ? void 0 : cookie.split("=")[1];
    try {
        const userInfo = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        socket.user = userInfo;
        next();
    }
    catch (error) {
        next(new Error(error));
    }
};
exports.verifyToken = verifyToken;
