import React from "react";

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface ITask {
  name: string;
  description: string;
  startTime: Date | null;
  endTime: Date | null;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

export type TaskCreation = Omit<ITask, "_id" | "updatedAt" | "createdAt">;

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
  startTime: Date | null;
  endTime: Date | null;
}

export interface GoogleCalendarEventCreation {
  location: string;
  summary: string;
  description: string;
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  };
}

export interface EventIdAndLocation {
  id: string;
  location: string;
}
