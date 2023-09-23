import { NextFunction, Request, Response } from "express";
import { CreateUserSchemaType } from "../schema/user/user.schema";
import {
  createUser,
  forgotPassword,
  loginUser,
  resetPassword,
} from "../services/auth.service";
import { CREATED, INTERNAL_SERVER_ERROR, OK } from "../utils/constants";
import { catchAsync } from "../utils/express/catchAsync";
import AppError from "../utils/appErrorClass";
import sendEmail from "../utils/sendEmail";

export const loginUserHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const { user, token } = await loginUser({ email, password });

    res.cookie("token", token, { httpOnly: true, maxAge: 900000000 });
    res
      .status(OK)
      .json({ status: "ok", userId: user._id, username: user.username });
  }
);

export const createUserHandler = catchAsync(
  async (
    // Defining the type of the request body as "CreateUserInput" type.
    req: Request<{}, {}, CreateUserSchemaType>,
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
    res
      .status(OK)
      .json({ status: "success", message: "Logged out successfully!" });
  }
);

export const forgotPasswordHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const { user, link } = await forgotPassword(email);

    try {
      // 3) Sent it to user's email
      await sendEmail({
        email: user.email,
        subject: "Your password reset token (valid for 10 min)",
        payload: { name: user.username, link: link },
        handlebarsPath: "./templates/resetPasswordMessage.handlebars",
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
    const { newPassword } = req.body;
    const { resetToken } = req.params;

    await resetPassword({ newPassword, resetToken });

    res.status(OK).json({
      status: "success",
      message: "Successfully updated the password!",
    });
  }
);
