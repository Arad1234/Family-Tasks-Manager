import { NextFunction, Request, Response } from "express";
import { userInfoRequest } from "../types/express";
import { JwtPayload } from "jsonwebtoken";
import { OK, CREATED, BAD_REQUEST } from "../utils/constants";
import { createFamilyRoom, getFamilyRooms } from "../services/room.service";

export const getFamilyRoomsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rooms = await getFamilyRooms();
    res.status(OK).json({ status: "ok", rooms: rooms });
  } catch (error) {
    next(error);
  }
};

export const createFamilyRoomHandler = async (
  req: userInfoRequest<{ roomName: string; maxMembers: number }>,
  res: Response,
  next: NextFunction
) => {
  const { roomName, maxMembers } = req.body;
  const { userId } = req.user as JwtPayload;

  try {
    const newRoom = await createFamilyRoom({ userId, roomName, maxMembers });

    res.status(CREATED).json({ status: "ok", newRoom: newRoom });
  } catch (error) {
    next(error);
  }
};
