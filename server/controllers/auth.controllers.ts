import { NextFunction, Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser, loginUser } from "../services/auth.service";
import { CREATED, OK } from "../utils/constants";

export const loginUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await loginUser({ email, password });
    res.cookie("token", token, { httpOnly: true, maxAge: 900000000 });
    res.status(OK).json({ status: "ok", userId: user?._id });
  } catch (error: any) {
    next(error);
  }
};

export const createUserHandler = async (
  // Defining the type of the request body as "CreateUserInput" type.
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;
  try {
    const user = await createUser({ username, email, password });

    res.status(CREATED).json({ status: "ok", newUser: user });
  } catch (error: any) {
    next(error);
  }
};
