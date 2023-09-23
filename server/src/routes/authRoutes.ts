import express from "express";
import {
  loginUserHandler,
  createUserHandler,
  logoutUserHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
} from "../controllers/auth.controllers";
import { userValidationSchema } from "../schema/user/user.schema";
import expressValidationSchema from "../middlewares/express/expressValidationSchema";
import { newPasswordValidationSchema } from "../schema/user/newPassword.schema";

const router = express.Router();

router.post("/login", loginUserHandler);
router.post(
  "/register",
  expressValidationSchema(userValidationSchema),
  createUserHandler
);
router.post("/logout", logoutUserHandler);
router.post("/forgotPassword", forgotPasswordHandler);
router.patch(
  "/resetPassword/:resetToken",
  expressValidationSchema(newPasswordValidationSchema),
  resetPasswordHandler
);

export default router;
