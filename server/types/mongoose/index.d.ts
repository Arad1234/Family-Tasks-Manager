import { Document, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

export interface IRoom extends Document {
  roomName: string;
  creator: string;
  familyMembers: string[];
  maxMembers: number;
  userId: Types.ObjectId;
}

export interface IMission extends Document {
  name: string;
  description: string;
  userId: Types.ObjectId;
}
