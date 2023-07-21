import { setLoading } from "../redux/slices/Auth/auth-slice";
import { setShowModal } from "../redux/slices/Modal/modal-slice";
import { resetRoomDetails } from "../redux/slices/Room/create-room";
import {
  setCreateRoom,
  setDeleteRoom,
  setJoinRoom,
  setRooms,
} from "../redux/slices/Room/rooms-slice";
import { AppDispatch } from "../redux/store";
import { RoomDataCreation, RoomDataJoin } from "../types";
import { socket } from "./socket";

export const getRoomsSocket = (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  socket.emit("rooms:read");

  socket.on("recievedRooms", (data) => {
    dispatch(setRooms(data));
    dispatch(setLoading(false));
    socket.off("recievedRooms");
  });
};

export const createRoomSocket = (
  dispatch: AppDispatch,
  createRoomData: RoomDataCreation
) => {
  const { maxMembers, roomName, roomPassword } = createRoomData;
  dispatch(setLoading(true));
  socket.emit("rooms:create", { roomName, maxMembers, roomPassword });

  socket.on("createdRoom", (data) => {
    dispatch(setCreateRoom(data));
    dispatch(setShowModal({ isOpen: false, status: "" }));
    dispatch(resetRoomDetails());
    dispatch(setLoading(false));
    socket.off("createdRoom");
  });
};

export const deleteRoomSocket = (dispatch: AppDispatch, roomId: string) => {
  dispatch(setLoading(true));

  socket.emit("rooms:delete", { roomId });
  dispatch(setShowModal({ isOpen: false, status: "" }));

  socket.on("deletedRoom", (data) => {
    dispatch(setDeleteRoom(data));
    dispatch(setLoading(false));
    socket.off("deletedRoom");
  });
};

export const joinRoomSocket = (
  dispatch: AppDispatch,
  joinRoomData: RoomDataJoin
) => {
  const { roomId, roomPassword, userId } = joinRoomData;

  dispatch(setLoading(true));

  socket.emit("rooms:join", { roomId, userId, roomPassword });
  dispatch(setShowModal({ isOpen: false, status: "" }));

  socket.on("joinedRoom", (data) => {
    const { roomId, userName } = data;
    dispatch(setJoinRoom({ roomId, userName }));
    dispatch(setLoading(false));
    socket.off("joinedRoom");
  });
};
