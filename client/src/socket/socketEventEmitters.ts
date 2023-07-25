import { setLoading } from "../redux/slices/Auth/auth-slice";
import { setShowModal } from "../redux/slices/Modal/modal-slice";
import { AppDispatch } from "../redux/store";
import { AddTaskData, RoomCreationData, JoinRoomData } from "../types";
import { socket } from "./socket";

export const getRoomsSocket = (dispatch: AppDispatch) => {
  dispatch(setLoading(true));

  socket.emit("rooms:read");
};

export const createRoomSocket = (
  dispatch: AppDispatch,
  createRoomData: RoomCreationData
) => {
  const { maxMembers, roomName, roomPassword } = createRoomData;

  dispatch(setLoading(true));

  socket.emit("rooms:create", {
    roomName,
    maxMembers,
    roomPassword,
  });
};

export const deleteRoomSocket = (dispatch: AppDispatch, roomId: string) => {
  dispatch(setLoading(true));

  socket.emit("rooms:delete", { roomId });

  hideModal(dispatch);
};

export const joinRoomSocket = (
  dispatch: AppDispatch,
  joinRoomData: JoinRoomData
) => {
  const { roomId, roomPassword } = joinRoomData;

  dispatch(setLoading(true));

  socket.emit("rooms:join", { roomId, roomPassword });

  hideModal(dispatch);
};

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
};

const hideModal = (dispatch: AppDispatch) => {
  dispatch(setShowModal({ isOpen: false, status: "" }));
};
