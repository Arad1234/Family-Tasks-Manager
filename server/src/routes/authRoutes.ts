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

const router = express.Router();

router.post("/login", loginUserHandler);
router.post(
  "/register",
  expressValidationSchema(userValidationSchema),
  createUserHandler
);
router.post("/logout", logoutUserHandler);
router.post("/forgotPassword", forgotPasswordHandler);
router.patch("/resetPassword/:token", resetPasswordHandler);

export default router;
