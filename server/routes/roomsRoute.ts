import express, { Application } from "express";
import {
  createFamilyRoomHandler,
  getFamilyRoomsHandler,
} from "../controllers/rooms.controller";
import validateResource from "../middlewares/validateSchema";
import { createRoomSchema } from "../schema/room.schema";
const router = express.Router();

router.get("/rooms", getFamilyRoomsHandler);
router.post(
  "/createRoom",
  validateResource(createRoomSchema),
  createFamilyRoomHandler as any
);

export default router;
