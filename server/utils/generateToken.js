import jwt from "jsonwebtoken";

export const generateToken = (userId, email) => {
  const token = jwt.sign({ userId, email }, process.env.SECRET_KET);
  return token;
};
