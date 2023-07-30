import { AppDispatch } from "../../redux/store";
import { AddTaskData } from "../../types";
import { setLoading } from "../../redux/slices/Auth/auth-slice";
import { socket } from "../socket";

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
