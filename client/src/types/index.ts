import { FormikProps } from "formik";
import React from "react";
import { NavigateFunction } from "react-router-dom";

// Common
export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export interface ChildrenProps {
  children: React.ReactNode;
}

// Schema
export interface ITask {
  name: string;
  description: string;
  startTime: Date | null;
  endTime: Date | null;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

export interface IUser {
  userId: string;
  username: string;
  tasks: ITask[];
  email: string;
  _id: string;
}

export type IMember = Omit<IUser, "email" | "_id">;

export interface IRoom {
  roomName: string;
  maxMembers: number | null;
  creator: { userId: string; username: string };
  familyMembers: IMember[];
  userId: string;
  _id: string;
}

// Data to server
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

export type CreateTaskFormModal = Omit<IAddTaskSocket, "userId" | "roomId">;

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

// Socket
//// Emitters payload
export interface IGetRoomsSocket {
  page: number;
  isIntersecting?: boolean;
}

export interface ICreateRoomsSocket {
  maxMembers: number | null;
  roomName: string;
  roomPassword: string;
}

export interface IJoinRoomSocket {
  roomId: string;
  roomPassword: string;
}

export interface IDeleteMemeberSocket {
  memberId: string;
  roomId: string;
  source: "admin" | "self";
}

export interface IAddTaskSocket {
  userId: string;
  roomId: string;
  name: string;
  description?: string;
  startTime?: Date;
  endTime?: Date;
}

//// Listeners
export interface ICommonListeners {
  navigate: NavigateFunction;
  locationPath: string;
}

export interface IErrorListeners {
  navigate: NavigateFunction;
}
