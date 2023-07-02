import Room from "../models/roomModel";
import { Request, Response } from "express";
export const getFamilyRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({ status: "ok", rooms: rooms });
  } catch (error) {}
};
