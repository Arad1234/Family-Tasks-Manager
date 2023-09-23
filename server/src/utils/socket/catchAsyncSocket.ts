import { Socket } from "socket.io";
import { socketErrorHandler } from "./errorHandlers/socketErrorHandler";

export const catchAsyncSocket = (fn: Function, socket: Socket) => {
  return (payload: any) => {
    fn(payload).catch((err: any) => {
      socketErrorHandler(err, socket);
    });
  };
};
