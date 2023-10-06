import { Socket } from "socket.io-client";
import { AppDispatch } from "../../redux/store";
import { setLoading } from "../../redux/slices/Auth/auth-slice";
import {
  setCreateRoom,
  setDeleteRoom,
  setRooms,
} from "../../redux/slices/Rooms/rooms-slice";
import { toast } from "react-toastify";
import { setHideModal } from "../../redux/slices/Modal/modal-slice";

export const roomsListeners = (socket: Socket, dispatch: AppDispatch) => {
  socket.on("recievedRooms", (data) => {
    const rooms = data;
    dispatch(setRooms(rooms));
    dispatch(setLoading(false));
  });

  socket.on("createdRoom", (data) => {
    console.log("data", data);
    const newRoom = data;
    dispatch(setCreateRoom(newRoom));

    if (newRoom.isCreator) {
      dispatch(setHideModal());
      dispatch(setLoading(false));
      toast.success("Room Created Successfully!");
    }
  });

  socket.on("deletedRoom", (data) => {
    const { deletedRoomId, isDeleter } = data;
    console.log(deletedRoomId, isDeleter);
    dispatch(setDeleteRoom(deletedRoomId));
    if (isDeleter) {
      dispatch(setHideModal());
      dispatch(setLoading(false));
      toast.success("Room Deleted Successfully!");
    }
  });
};
