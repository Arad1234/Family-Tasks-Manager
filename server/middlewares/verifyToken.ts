import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { userInfoRequest } from "../types/express";

export const verifyToken = (
  req: userInfoRequest<{}>,
  res: Response,
  next: NextFunction
) => {
  const { cookie } = req.headers;
  const token = cookie?.split("=")[1];
  try {
    const userInfo = jwt.verify(
      token as string,
      process.env.SECRET_KEY as string
    );
    req.user = userInfo;
    next();
  } catch (error) {
    next({ error: "Unauthorized!" });
  }
};
