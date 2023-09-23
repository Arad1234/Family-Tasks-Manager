import jwt from "jsonwebtoken";
import type { ObjectId } from "mongoose";
import { config } from "../config/config";

export const generateToken = (userId: ObjectId, username: string) => {
  const token = jwt.sign(
    { userId, username },
    process.env.SECRET_KEY as string,
    { expiresIn: config.auth.jwtExpiresIn }
  );
  return token;
};
