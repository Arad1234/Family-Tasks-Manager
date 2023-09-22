import { NextFunction, Request, Response } from "express";
import { CreateUserInput } from "../schema/user/user.schema";
import {
  createUser,
  forgotPassword,
  loginUser,
} from "../services/auth.service";
import {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  OK,
} from "../utils/constants";
import { catchAsync } from "../utils/express/catchAsync";
import AppError from "../utils/appErrorClass";
import sendEmail from "../utils/sendEmail";
import crypto from "crypto";
import User from "../models/user.model";

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

export const forgotPasswordHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const { user, message } = await forgotPassword(email);

    try {
      // 3) Sent it to user's email
      await sendEmail({
        email: user.email,
        subject: "Your password reset token (valid for 10 min)",
        text: message,
      });

      res.status(OK).json({
        status: "success",
        message: "A link to reset your password has been emailed to you!",
      });
    } catch (error) {
      console.log(error);
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;

      await user.save();

      return next(
        new AppError(
          "There was an error sending the email. Try again later!",
          INTERNAL_SERVER_ERROR
        )
      );
    }
  }
);

export const resetPasswordHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Get user based on the token
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    // 2) If token has not expired, and there is user, set the new password
    const user = await User.findOne(
      { passwordResetToken: hashedToken },
      { passwordResetExpires: { $gt: Date.now() } }
    );

    if (!user) {
      return next(
        new AppError("Token is invalid or has expired!", BAD_REQUEST)
      );
    }

    
    // 3) Update changedPasswordAt property for the user

    // 4) Log the user in, send JWT.
  }
);
