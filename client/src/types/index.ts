import { FormikProps } from "formik";
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
  roomPassword: string;
  maxMembers: number | null;
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

type ExtendedProperties = { private: { taskCreatedAt: string } };

export interface GoogleCalendarEventCreation {
  extendedProperties: ExtendedProperties;
  summary: string;
  description: string;
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  };
}

export interface EventIdAndCreatedAt {
  id: string;
  taskCreatedAt: string;
}

export type formikPropsType = FormikProps<
  | {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    }
  | { email: string; password: string }
>;
