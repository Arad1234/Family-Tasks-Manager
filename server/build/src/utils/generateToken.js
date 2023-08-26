"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userId, username) => {
    const token = jsonwebtoken_1.default.sign({ userId, username }, process.env.SECRET_KEY);
    return token;
};
exports.generateToken = generateToken;
