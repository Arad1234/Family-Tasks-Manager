import { NextFunction, Request, Response } from "express";
import { CreateUserInput } from "../schema/user/user.schema";
import { createUser, loginUser } from "../services/auth.service";
import { CREATED, OK } from "../utils/constants";
import { catchAsync } from "../utils/express/catchAsync";

export const loginUserHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const { user, token } = await loginUser({ email, password });

    res.cookie("token", token, { httpOnly: true, maxAge: 900000000 });
    res
      .status(OK)
      .json({ status: "ok", userId: user?._id, username: user.username });
  }
);

export const createUserHandler = catchAsync(
  async (
    // Defining the type of the request body as "CreateUserInput" type.
    req: Request<{}, {}, CreateUserInput>,
    res: Response,
    _next: NextFunction
  ) => {
    const { username, email, password } = req.body;
    
    const user = await createUser({ username, email, password });

    res.status(CREATED).json({ status: "ok", newUser: user });
  }
);

export const logoutUserHandler = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    res.clearCookie("token");
    res.status(OK).json("Logged out!");
  }
);
