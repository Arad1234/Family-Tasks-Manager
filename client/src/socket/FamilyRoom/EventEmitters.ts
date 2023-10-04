import { AppDispatch } from "../../redux/store";
import { AddTaskData } from "../../types";
import { setLoading } from "../../redux/slices/Auth/auth-slice";
import { socket } from "../socket";

export const getMemberRoomsSocket = (
  dispatch: AppDispatch,
  userId: string | null
) => {
  dispatch(setLoading(true));
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
  memberId: string | undefined,
  roomId: string
) => {
  dispatch(setLoading(true));
  socket.emit("members:delete", { memberId, roomId });
};

export const addTaskSocket = (
  dispatch: AppDispatch,
  addTaskData: AddTaskData
) => {
  const { description, memberId, name, roomId, startTime, endTime } =
    addTaskData;
  dispatch(setLoading(true));
  socket.emit("tasks:create", {
    memberId,
    roomId,
    name,
    description,
    startTime,
    endTime,
  });
};
