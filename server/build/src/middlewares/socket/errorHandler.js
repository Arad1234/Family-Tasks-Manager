"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketErrorHandler = void 0;
const socketErrorHandler = (socket) => {
    // If the middleware call "next(error)" it will automatically be handled by this event listener.
    socket.on("error", (err) => {
        console.log(err);
        // I have "error" event listener in the client.
        socket.emit("error", err);
    });
};
exports.socketErrorHandler = socketErrorHandler;
