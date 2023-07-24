import { Document, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

interface simpleTask {
  name: string;
  description: string;
  timeToDo?: Date | null;
}

export interface IRoom extends Document {
  roomName: string;
  creator: { userId: Types.ObjectId; username: string };
  familyMembers: [
    {
      userId: string;
      username: string;
      tasks: simpleTask[];
    }
  ];
  maxMembers: number;
  roomPassword: string;
}
