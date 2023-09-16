import User from "../models/user.model";
import { UserLoginDetails, UserRegitrationDetails } from "../types/common";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";
import AppError from "../utils/express/appErrorClass";
import { UNAUTHORIZED } from "../utils/constants";

export const createUser = async (userData: UserRegitrationDetails) => {
  const { username, email, password } = userData;

  await User.create({
    username,
    email,
    password,
  });
};

export const loginUser = async (userInfo: UserLoginDetails) => {
  const { email, password } = userInfo;

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("Wrong email or password", UNAUTHORIZED);
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Wrong email or password", UNAUTHORIZED);
  }

  const token = generateToken(user._id, user.username);

  return { user, token };
};
