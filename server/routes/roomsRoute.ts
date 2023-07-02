import express from "express";
import { getFamilyRooms } from "../controllers/roomsController";
const router = express.Router();

router.get("/rooms", getFamilyRooms);

export default router;
