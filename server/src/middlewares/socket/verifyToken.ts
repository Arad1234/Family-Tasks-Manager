import jwt from "jsonwebtoken";
import { Socket } from "socket.io";

export const verifyToken = (socket: Socket, next: Function) => {
  const { cookie } = socket.handshake.headers;
  const token = cookie?.split("=")[1];
  try {
    const userInfo = jwt.verify(
      token as string,
      process.env.SECRET_KEY as string
    );
    socket.data.user = userInfo;
    next();
  } catch (error: any) {
    next(new Error(error));
  }
};
