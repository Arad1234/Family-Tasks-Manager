import jwt from "jsonwebtoken";
import { Socket } from "socket.io";

export const verifyToken = (socket: Socket, next: Function) => {
  const { cookie } = socket.handshake.headers;
  const token = cookie?.split("=")[1];
  console.log(token);
  if (token) {
    try {
      const userInfo = jwt.verify(
        token as string,
        process.env.SECRET_KEY as string
      );
      console.log(userInfo);
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
