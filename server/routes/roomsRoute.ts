import express, { Application } from "express";
import {
  createFamilyRoom,
  getFamilyRooms,
} from "../controllers/rooms.controller";
const router = express.Router();

router.get("/rooms", getFamilyRooms);
router.post("/createRoom", createFamilyRoom as any);

export default router;
