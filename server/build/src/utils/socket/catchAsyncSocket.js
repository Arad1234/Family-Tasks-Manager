"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsyncSocket = void 0;
const catchAsyncSocket = (fn, socket) => {
    return (payload) => {
        fn(payload).catch((err) => {
            socket.emit("error", err.message);
        });
    };
};
exports.catchAsyncSocket = catchAsyncSocket;
