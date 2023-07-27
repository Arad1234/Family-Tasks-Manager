import { AppDispatch } from "../../redux/store";
import { AddTaskData } from "../../types";
import { setLoading } from "../../redux/slices/Auth/auth-slice";
import { hideModal } from "../../utils/helpers/hideModal";
import { resetTaskDetails } from "../../redux/slices/FamilyRoom/createTask-slice";
import { socket } from "../socket";

export const addTaskSocket = (
  dispatch: AppDispatch,
  addTaskData: AddTaskData
) => {
  const { description, memberId, name, roomId, timeToDo } = addTaskData;
  dispatch(setLoading(true));
  socket.emit("tasks:create", {
    memberId,
    roomId,
    name,
    description,
    timeToDo,
  });

  hideModal(dispatch);
  dispatch(resetTaskDetails());
};
