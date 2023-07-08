import Room from "../models/room.model";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { userInfoRequest } from "../types/express";
import { JwtPayload } from "jsonwebtoken";

const { OK, CREATED, INTERNAL_SERVER_ERROR, BAD_REQUEST } = StatusCodes;

export const getFamilyRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find();
    res.status(OK).json({ status: "ok", rooms: rooms });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: error });
  }
};

export const createFamilyRoom = async (req: userInfoRequest, res: Response) => {
  const { roomName, maxMembers } = req.body;
  const { userId } = req.user as JwtPayload;
  console.log(userId);
  try {
    const newRoom = await Room.create({
      roomName: roomName,
      maxMembers: maxMembers,
      creator: userId,
      familyMembers: [userId],
    });
    res.status(CREATED).json({ status: "ok", newRoom: newRoom });
  } catch (error) {
    res.status(BAD_REQUEST).json({ error: error });
  }
};
