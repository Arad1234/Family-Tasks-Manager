import { Document, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  passwordResetToken: string | undefined;
  passwordResetExpires: Date | undefined;
  tasks: Types.ObjectId[];
}

interface ITask extends Document {
  name: string;
  description: string | undefined;
  startTime: Date | null;
  endTime: Date | null;
  roomId: Types.ObjectId;
}

interface IMember extends Document {
  memberId: Types.ObjectId;
  username: string;
  tasks: ITask[];
}

export interface IRoom extends Document {
  roomName: string;
  creator: { userId: Types.ObjectId; username: string };
  familyMembers: Types.ObjectId[];
  maxMembers: number;
  roomPassword: string;
}
