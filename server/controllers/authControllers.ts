import User from "../models/userModel";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { generateToken } from "../utils/generateToken";
import { Request, Response } from "express";

const { OK, UNAUTHORIZED, INTERNAL_SERVER_ERROR, CREATED, BAD_REQUEST } =
  StatusCodes;

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = generateToken(user._id, user.email);
        res.cookie("token", token, { httpOnly: true, maxAge: 900000 });
        res.status(OK).json({ status: "ok", userId: user._id });
      } else {
        res.status(UNAUTHORIZED).json({ error: "Wrong email or password" });
      }
    } else {
      res.status(UNAUTHORIZED).json({ error: "Wrong email or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ error: error });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    await User.create({
      username,
      email,
      password,
    });

    res.status(CREATED).json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.status(BAD_REQUEST).json({ error: error });
  }
};
