import User from "../models/user.model";
import { UserLoginDetails, UserRegisterDetails } from "../types/common";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";
import AppError from "../utils/appErrorClass";
import { NOT_FOUND, UNAUTHORIZED } from "../utils/constants";

export const createUser = async (userData: UserRegisterDetails) => {
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

export const forgotPassword = async (email: string) => {
  // 1) Get user based posted email
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("There is no user with email adress", NOT_FOUND);
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();

  await user.save();

  const message = `Forgot your password? Copy this token ${resetToken} and paste it to the form in the application.\nIf you didn't forget your password, please ignore this email!`;

  return { user, message };
};
