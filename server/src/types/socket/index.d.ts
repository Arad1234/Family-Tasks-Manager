import { JwtPayload } from "jsonwebtoken";
import { Socket } from "socket.io";

export interface CreateRoomPayload {
  roomName: string;
  maxMembers: number;
  roomPassword: string;
}

export interface JoinRoomPayload {
  roomId: string;
  userId: string;
  roomPassword: string;
}
