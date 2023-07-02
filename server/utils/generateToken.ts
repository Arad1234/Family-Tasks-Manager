import jwt from "jsonwebtoken";
import type { ObjectId } from "mongoose";

export const generateToken = (userId: ObjectId, email: string) => {
  const token = jwt.sign({ userId, email }, process.env.SECRET_KEY as string);
  return token;
};
