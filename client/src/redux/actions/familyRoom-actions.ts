import {
  ADD_TASK_SOCKET,
  GET_CURRENT_ROOM_SOCKET,
  GET_MEMBER_ROOMS_SOCKET,
} from "@Utils/constants/actionTypeConstants";
import { IAddTaskSocket } from "src/types";

export const getMemberRoomsSocket = (userId: string | null) => {
  return {
    type: GET_MEMBER_ROOMS_SOCKET,
    payload: { userId },
  };
};

export const getCurrentRoomSocket = (roomId: string | undefined) => {
  return {
    type: GET_CURRENT_ROOM_SOCKET,
    payload: { roomId },
  };
};

export const addTaskSocket = ({
  description,
  userId,
  name,
  startTime,
  endTime,
  roomId,
}: IAddTaskSocket) => {
  return {
    type: ADD_TASK_SOCKET,
    payload: { description, userId, name, startTime, endTime, roomId },
  };
};
