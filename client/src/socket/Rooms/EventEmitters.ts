import { setLoading } from "../../redux/slices/Auth/auth-slice";
import { AppDispatch } from "../../redux/store";
import { RoomCreationData, JoinRoomData } from "../../types";
import { hideModal } from "../../utils/helpers/hideModal";
import { socket } from "../socket";

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
