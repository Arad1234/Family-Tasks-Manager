import { AppDispatch } from "../../redux/store";
import { setLoading } from "../../redux/slices/Auth/auth-slice";
import {
  setCreateRoom,
  setDeleteRoom,
  setRooms,
} from "../../redux/slices/Rooms/rooms-slice";
import { toast } from "react-toastify";
import { setHideModal } from "../../redux/slices/Modal/modal-slice";
import { socket } from "../socket";
import { setHideMenu } from "../../redux/slices/BurgerMenu/burgerMenu-slice";
import {
  setIncrementPage,
  setIsAllRooms,
  setIsIntersecting,
} from "../../redux/slices/Pagination/pagination-slice";

export const roomsListeners = (dispatch: AppDispatch) => {
  socket.on("recievedRooms", (data) => {
    const rooms = data;

    if (rooms.length > 0) {
      dispatch(setRooms(rooms));
      dispatch(setIncrementPage());
    } else {
      dispatch(setIsAllRooms(true));
    }

    dispatch(setIsIntersecting(false));

    dispatch(setLoading(false));
  });

  socket.on("createdRoom", (data) => {
    console.log("data", data);
    const newRoom = data;
    dispatch(setCreateRoom(newRoom));

    if (newRoom.isCreator) {
      dispatch(setHideModal());
      dispatch(setLoading(false));
      dispatch(setHideMenu());
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
