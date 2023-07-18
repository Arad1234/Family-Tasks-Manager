import React from "react";

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface IRoom {
  roomName: string;
  maxMembers: number;
  creator: string;
  familyMembers: string[];
  userId: string;
  _id: string;
}
