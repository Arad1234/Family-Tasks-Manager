import { Socket } from "socket.io-client";
import { AppDispatch } from "../../redux/store";
import { setLoading } from "../../redux/slices/Auth/auth-slice";
import {
  setCreateRoom,
  setDeleteRoom,
  setJoinRoom,
  setRooms,
} from "../../redux/slices/Rooms/rooms-slice";
import { resetRoomDetails } from "../../redux/slices/Rooms/createRoom-slice";
import { resetRoomPassword } from "../../redux/slices/Rooms/joinRoom-slice";
import { hideModal } from "../../utils/helpers/hideModal";

export const roomsListeners = (socket: Socket, dispatch: AppDispatch) => {
  socket.on("recievedRooms", (data) => {
    const rooms = data;
    dispatch(setRooms(rooms));
    dispatch(setLoading(false));
  });

  socket.on("createdRoom", (data) => {
    const newRoom = data;
    dispatch(setCreateRoom(newRoom));
    hideModal(dispatch);
    dispatch(resetRoomDetails());
    dispatch(setLoading(false));
  });

  socket.on("deletedRoom", (data) => {
    const deletedRoomId = data;
    dispatch(setDeleteRoom(deletedRoomId));
    hideModal(dispatch);
    dispatch(setLoading(false));
  });

  socket.on("joinedRoom", (data) => {
    const { roomId, username, userId } = data;
    dispatch(setJoinRoom({ roomId, username, userId }));
    dispatch(resetRoomPassword());
    hideModal(dispatch);
    dispatch(setLoading(false));
  });
};
