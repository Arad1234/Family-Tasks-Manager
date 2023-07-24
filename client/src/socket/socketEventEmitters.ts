import { setLoading } from "../redux/slices/Auth/auth-slice";
import { setShowModal } from "../redux/slices/Modal/modal-slice";
import { AppDispatch } from "../redux/store";
import { RoomDataCreation, RoomDataJoin } from "../types";
import { socket } from "./socket";

export const getRoomsSocket = (dispatch: AppDispatch) => {
  dispatch(setLoading(true));

  socket.emit("rooms:read");
};

export const createRoomSocket = (
  dispatch: AppDispatch,
  createRoomData: RoomDataCreation
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

  dispatch(setShowModal({ isOpen: false, status: "" }));
};

export const joinRoomSocket = (
  dispatch: AppDispatch,
  joinRoomData: RoomDataJoin
) => {
  const { roomId, roomPassword } = joinRoomData;

  dispatch(setLoading(true));

  socket.emit("rooms:join", { roomId, roomPassword });

  dispatch(setShowModal({ isOpen: false, status: "" }));
};
