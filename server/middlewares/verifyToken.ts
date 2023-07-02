import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { userInfoRequest } from "../types/express";

export const verifyToken = (
  req: userInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cookie } = req.headers;
    if (cookie) {
      const token = cookie.split("=")[1];
      const userInfo = jwt.verify(token, process.env.SECRET_KEY as string);
      console.log(userInfo);
      req.user = userInfo;
      next();
    } else {
      res.status(401).json({ error: "Unauthorized!" });
    }
  } catch (error) {
    res.status(401).json({ error: "Unauthorized!" });
  }
};
