import { Socket } from "socket.io-client";
import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { setLoading } from "../redux/slices/Auth/auth-slice";
import {
  setCreateRoom,
  setDeleteRoom,
  setJoinRoom,
  setRooms,
} from "../redux/slices/Room/rooms-slice";
import { setShowModal } from "../redux/slices/Modal/modal-slice";
import { resetRoomDetails } from "../redux/slices/Room/create-room";
import { resetRoomPassword } from "../redux/slices/Room/join-room";

export const initializeSocketListeners = (
  socket: Socket,
  navigate: NavigateFunction,
  dispatch: AppDispatch
) => {
  socket.on("recievedRooms", (data) => {
    dispatch(setRooms(data));
    dispatch(setLoading(false));
  });

  socket.on("createdRoom", (data) => {
    dispatch(setCreateRoom(data));
    dispatch(setShowModal({ isOpen: false, status: "" }));
    dispatch(resetRoomDetails());
    dispatch(setLoading(false));
  });

  socket.on("deletedRoom", (data) => {
    dispatch(setDeleteRoom(data));
    dispatch(setLoading(false));
  });

  socket.on("joinedRoom", (data) => {
    const { room, username, userId } = data;
    dispatch(setJoinRoom({ room, username, userId }));
    dispatch(resetRoomPassword());
    dispatch(setLoading(false));
  });

  socket.on("error", (err) => {
    console.log(err);
    const { issues } = err;
    if (issues) {
      const [firstIssue] = issues;
      alert(firstIssue.message);
    } else {
      alert(err);
    }
    dispatch(setLoading(false));
  });

  socket.on("connect_error", (err) => {
    if (err.message.includes("jwt")) {
      navigate("/");
    }
    console.log(err);
    dispatch(setLoading(false));
  });
};
