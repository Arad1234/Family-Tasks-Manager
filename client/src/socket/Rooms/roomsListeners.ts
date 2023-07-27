import { Socket } from "socket.io-client";
import { AppDispatch } from "../../redux/store";
import { setLoading } from "../../redux/slices/Auth/auth-slice";
import {
  setAddTask,
  setCreateRoom,
  setDeleteRoom,
  setJoinRoom,
  setRooms,
} from "../../redux/slices/Rooms/rooms-slice";
import { setShowModal } from "../../redux/slices/Modal/modal-slice";
import { resetRoomDetails } from "../../redux/slices/Rooms/createRoom-slice";
import { resetRoomPassword } from "../../redux/slices/Rooms/joinRoom-slice";

export const roomsListeners = (socket: Socket, dispatch: AppDispatch) => {
  socket.on("recievedRooms", (data) => {
    const rooms = data;
    dispatch(setRooms(rooms));
    dispatch(setLoading(false));
  });

  socket.on("createdRoom", (data) => {
    const newRoom = data;
    dispatch(setCreateRoom(newRoom));
    dispatch(setShowModal({ isOpen: false, status: "" }));
    dispatch(resetRoomDetails());
    dispatch(setLoading(false));
  });

  socket.on("deletedRoom", (data) => {
    const deletedRoomId = data;
    dispatch(setDeleteRoom(deletedRoomId));
    dispatch(setLoading(false));
  });

  socket.on("joinedRoom", (data) => {
    const { room, username, userId } = data;
    dispatch(setJoinRoom({ room, username, userId }));
    dispatch(resetRoomPassword());
    dispatch(setLoading(false));
  });

  socket.on("taskCreated", (data) => {
    const { newTask, memberId } = data;
    console.log(newTask, memberId);
    dispatch(setAddTask({ newTask, memberId }));
    dispatch(setLoading(false));
  });
};
