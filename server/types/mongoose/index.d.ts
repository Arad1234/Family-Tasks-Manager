import { Document, Types } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
}

export interface RoomDocument extends Document {
  name: string;
  creator: Types.ObjectId;
  familyMembers: Types.ObjectId[];
  maxMembers: number;
}

export interface MissionDocument extends Document {
  name: string;
  description: string;
  userId: Types.ObjectId;
}
