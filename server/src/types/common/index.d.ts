import { ObjectId } from "mongoose";

export interface UserRegisterDetails {
  username: string;
  email: string;
  password: string;
}

export type UserLoginDetails = Omit<UserRegisterDetails, "username">;

export interface RoomData {
  roomName: string;
  maxMembers: number;
  username: string;
  roomPassword: string;
  userId: ObjectId;
}

export interface IMailOptions {
  email: string;
  subject: string;
  payload: { name: string; link: string };
  handlebarsPath: string;
}
