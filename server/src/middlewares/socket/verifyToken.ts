import jwt from "jsonwebtoken";
import { Socket } from "socket.io";

export const verifyToken = (socket: Socket, next: Function) => {
  const { cookie } = socket.handshake.headers;
  const tokenParam = cookie?.split(" ")[1];
  const token = tokenParam?.split("=")[1];
  if (token) {
    try {
      const userInfo = jwt.verify(
        token as string,
        process.env.SECRET_KEY as string
      );
      (socket as any).user = userInfo;
      next();
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  } else {
    next();
  }
};
