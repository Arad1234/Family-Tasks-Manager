import express from "express";
import {
  loginUserHandler,
  createUserHandler,
  logoutUserHandler,
} from "../controllers/auth.controllers";
import { userValidationSchema } from "../schema/user/user.schema";
import expressValidationSchema from "../middlewares/express/ExpressValidationSchema";

const router = express.Router();

router.post("/login", loginUserHandler);
router.post(
  "/register",
  expressValidationSchema(userValidationSchema),
  createUserHandler
);
router.post("/logout", logoutUserHandler);

export default router;
