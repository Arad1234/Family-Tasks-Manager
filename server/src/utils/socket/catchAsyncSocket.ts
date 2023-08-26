import { Socket } from "socket.io";

export const catchAsyncSocket = (fn: Function, socket: Socket) => {
  return (payload: any) => {
    fn(payload).catch((err: any) => {
      socket.emit("error", err.message);
    });
  };
};
