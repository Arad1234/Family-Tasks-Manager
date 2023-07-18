import User from "../models/user.model";
import { UserLoginDetails, UserRegitrationDetails } from "../types/common";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";

export const createUser = async (userData: UserRegitrationDetails) => {
  const { username, email, password } = userData;
  try {
    await User.create({
      username,
      email,
      password,
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUser = async (userInfo: UserLoginDetails) => {
  const { email, password } = userInfo;

  const user = await User.findOne({ email: email });
  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = generateToken(user._id, user.username);
      return { user, token };
    } else {
      throw new Error("Wrong email or password");
    }
  } else {
    throw new Error("Wrong email or password");
  }
};
