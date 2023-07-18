import { ObjectId } from "mongoose";

export interface UserRegitrationDetails {
  username: string;
  email: string;
  password: string;
}

export type UserLoginDetails = Omit<UserRegitrationDetails, "username">;

export interface RoomData {
  roomName: string;
  maxMembers: number;
  username: string;
  userId: ObjectId;
}
