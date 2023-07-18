import express from "express";
import {
  loginUserHandler,
  createUserHandler,
} from "../controllers/auth.controllers";
import validateResource from "../middlewares/express/validateSchema";
import { userValidationSchema } from "../schema/user.schema";

const router = express.Router();

router.post("/login", loginUserHandler);
router.post(
  "/register",
  validateResource(userValidationSchema),
  createUserHandler
);

export default router;
