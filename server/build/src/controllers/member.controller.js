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
exports.memberHandler = void 0;
const member_service_1 = require("../services/member.service");
const errorHandler_1 = require("../middlewares/socket/errorHandler");
const memberHandler = (io, socket) => {
    const deleteMemberHandler = (payload) => __awaiter(void 0, void 0, void 0, function* () {
        const { memberId, roomId } = payload;
        try {
            yield (0, member_service_1.deleteMember)(payload);
            io.emit("memberDeleted", { memberId, roomId });
        }
        catch (error) {
            console.log(error);
            socket.emit("error", error.message);
        }
    });
    socket.on("members:delete", deleteMemberHandler);
    (0, errorHandler_1.socketErrorHandler)(socket);
};
exports.memberHandler = memberHandler;
