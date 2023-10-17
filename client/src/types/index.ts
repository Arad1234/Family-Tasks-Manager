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

export interface IUser {
  userId: string;
  username: string;
  tasks: ITask[];
  email: string;
  _id: string;
}

export interface IRoom {
  roomName: string;
  maxMembers: number | null;
  creator: { userId: string; username: string };
  familyMembers: string[] | IUser[];
  userId: string;
  _id: string;
}

export interface RoomCreationData {
  roomName: string;
  roomPassword: string;
  maxMembers: number | null;
}
export interface CreateRoomFormModal {
  roomName: string;
  maxMembers: number | null;
  roomPassword: string;
}

export interface JoinRoomData {
  roomId: string;
  roomPassword: string;
}

export interface AddTaskData {
  userId: string;
  roomId: string;
  name: string;
  description?: string;
  startTime?: Date;
  endTime?: Date;
}

export type CreateTaskFormModal = Omit<AddTaskData, "userId" | "roomId">;

// Google calendar
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

// Formik Types
type RegisterFormikType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type LoginFormikType = Omit<RegisterFormikType, "name" | "confirmPassword">;

type forgotPasswordFormikType = Omit<LoginFormikType, "password">;

type resetPasswordFormikType = { newPassword: string; confirmPassword: string };

export type formikPropsType =
  | FormikProps<RegisterFormikType>
  | FormikProps<LoginFormikType>
  | FormikProps<forgotPasswordFormikType>
  | FormikProps<resetPasswordFormikType>;
