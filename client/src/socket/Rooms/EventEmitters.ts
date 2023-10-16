import { setLoading } from "../../redux/slices/Auth/auth-slice";
import { AppDispatch } from "../../redux/store";
import { RoomCreationData, JoinRoomData } from "../../types";
import { socket } from "../socket";

export const getRoomsSocket = (dispatch: AppDispatch, page: number) => {
  dispatch(setLoading(true));
  socket.emit("rooms:read", { page });
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

export const deleteRoomSocket = (
  dispatch: AppDispatch,
  roomId: string | undefined
) => {
  dispatch(setLoading(true));

  socket.emit("rooms:delete", { roomId });
};

export const joinRoomSocket = (
  dispatch: AppDispatch,
  joinRoomData: JoinRoomData
) => {
  const { roomId, roomPassword } = joinRoomData;

  dispatch(setLoading(true));

  socket.emit("rooms:join", { roomId, roomPassword });
};
