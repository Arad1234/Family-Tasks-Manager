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
exports.logoutUserHandler = exports.createUserHandler = exports.loginUserHandler = void 0;
const auth_service_1 = require("../services/auth.service");
const constants_1 = require("../utils/constants");
const catchAsync_1 = require("../utils/express/catchAsync");
exports.loginUserHandler = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { user, token } = yield (0, auth_service_1.loginUser)({ email, password });
    res.cookie("token", token, { httpOnly: true, maxAge: 900000000 });
    res
        .status(constants_1.OK)
        .json({ status: "ok", userId: user === null || user === void 0 ? void 0 : user._id, username: user.username });
}));
exports.createUserHandler = (0, catchAsync_1.catchAsync)((
// Defining the type of the request body as "CreateUserInput" type.
req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const user = yield (0, auth_service_1.createUser)({ username, email, password });
    res.status(constants_1.CREATED).json({ status: "ok", newUser: user });
}));
exports.logoutUserHandler = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    res.status(constants_1.OK).json("Logged out!");
}));
