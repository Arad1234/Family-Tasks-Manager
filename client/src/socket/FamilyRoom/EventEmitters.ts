import { AppDispatch } from "../../redux/store";
import { AddTaskData } from "../../types";
import { setLoading } from "../../redux/slices/Auth/auth-slice";
import { socket } from "../socket";

export const getMemberRoomsSocket = (userId: string | null) => {
  socket.emit("members:getRooms", { userId });
};

export const getCurrentRoomSocket = (
  dispatch: AppDispatch,
  roomId: string | undefined
) => {
  dispatch(setLoading(true));
  socket.emit("members:getCurrentRoom", { roomId });
};

export const deleteMemberSocket = (
  dispatch: AppDispatch,
  memberId: string,
  roomId: string
) => {
  dispatch(setLoading(true));
  socket.emit("members:delete", { memberId, roomId });
};

export const addTaskSocket = (
  dispatch: AppDispatch,
  addTaskData: AddTaskData
) => {
  const { description, userId, name, startTime, endTime, roomId } = addTaskData;

  dispatch(setLoading(true));

  socket.emit("tasks:create", {
    userId,
    name,
    description,
    startTime,
    endTime,
    roomId,
  });
};
