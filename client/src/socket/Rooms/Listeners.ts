import { Socket } from "socket.io-client";
import { AppDispatch } from "../../redux/store";
import { setLoading } from "../../redux/slices/Auth/auth-slice";
import {
  setCreateRoom,
  setDeleteRoom,
  setRooms,
} from "../../redux/slices/Rooms/rooms-slice";
import { resetRoomDetails } from "../../redux/slices/Rooms/createRoom-slice";
import { hideModal } from "../../utils/helpers/hideModal";
import { toast } from "react-toastify";

export const roomsListeners = (socket: Socket, dispatch: AppDispatch) => {
  socket.on("recievedRooms", (data) => {
    const rooms = data;
    dispatch(setRooms(rooms));
    console.log("recieved rooms!");
    dispatch(setLoading(false));
  });

  socket.on("createdRoom", (data) => {
    const newRoom = data;
    dispatch(setCreateRoom(newRoom));
    hideModal(dispatch);
    dispatch(resetRoomDetails());
    dispatch(setLoading(false));
    toast.success("Room Created Successfully!");
  });

  socket.on("deletedRoom", (data) => {
    const deletedRoomId = data;
    dispatch(setDeleteRoom(deletedRoomId));
    hideModal(dispatch);
    dispatch(setLoading(false));
    toast.success("Room Deleted Successfully!");
  });
};
