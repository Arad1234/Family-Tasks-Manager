import jwt from "jsonwebtoken";
import type { ObjectId } from "mongoose";

export const generateToken = (userId: ObjectId, username: string) => {
  const token = jwt.sign(
    { userId, username },
    process.env.SECRET_KEY as string
  );
  return token;
};
