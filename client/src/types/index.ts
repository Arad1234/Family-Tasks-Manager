import React from "react";

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface IRoom {
  roomName: string;
  maxMembers: number | null;
  creator: string;
  familyMembers: { username: string; userId: string }[];
  userId: string;
  _id: string;
}

export interface RoomDataCreation {
  roomName: string;
  maxMembers: number | null;
  roomPassword: string;
}

export interface RoomDataJoin {
  roomId: string;
  userId: string;
  roomPassword: string;
}
