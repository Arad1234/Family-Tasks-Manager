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
    dispatch(setLoading(false));
  });

  socket.on("createdRoom", (data) => {
    console.log("data", data);
    const newRoom = data;
    dispatch(setCreateRoom(newRoom));

    if (newRoom.isCreator) {
      hideModal(dispatch);
      dispatch(setLoading(false));
      dispatch(resetRoomDetails());
      toast.success("Room Created Successfully!");
    }
  });

  socket.on("deletedRoom", (data) => {
    const { deletedRoomId, isDeleter } = data;
    console.log(deletedRoomId, isDeleter);
    dispatch(setDeleteRoom(deletedRoomId));
    if (isDeleter) {
      hideModal(dispatch);
      dispatch(setLoading(false));
      toast.success("Room Deleted Successfully!");
    }
  });
};
