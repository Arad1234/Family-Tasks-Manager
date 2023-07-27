import React from "react";

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface ITask {
  name: string;
  description: string;
  timeToDo: Date | null;
  _id: string;
}

export type TaskCreation = Omit<ITask, "_id">;

export interface IMember {
  userId: string;
  username: string;
  tasks: ITask[];
}

export type FamilyMembers = IMember[];

export interface IRoom {
  roomName: string;
  maxMembers: number | null;
  creator: { userId: string; username: string };
  familyMembers: FamilyMembers;
  userId: string;
  _id: string;
}

export interface RoomCreationData {
  roomName: string;
  maxMembers: number | null;
  roomPassword: string;
}

export interface JoinRoomData {
  roomId: string;
  roomPassword: string;
}

export interface AddTaskData {
  memberId: string;
  roomId: string;
  name: string;
  description: string;
  timeToDo: Date | null;
}
