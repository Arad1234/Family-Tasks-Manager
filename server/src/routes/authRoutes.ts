import express from "express";
import {
  loginUserHandler,
  createUserHandler,
} from "../controllers/auth.controllers";
import validateSchema from "../middlewares/express/validateSchema";
import { userValidationSchema } from "../schema/user/user.schema";

const router = express.Router();

router.post("/login", loginUserHandler);
router.post(
  "/register",
  validateSchema(userValidationSchema),
  createUserHandler
);

export default router;
