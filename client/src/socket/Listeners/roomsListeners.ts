import { toast } from "react-toastify";
import { setLoading } from "../../redux/slices/Auth/auth-slice";
import { setHideMenu } from "../../redux/slices/BurgerMenu/burgerMenu-slice";
import { setHideModal } from "../../redux/slices/Modal/modal-slice";
import {
  setIncrementPage,
  setIsAllRooms,
  setIsIntersecting,
} from "../../redux/slices/Pagination/pagination-slice";
import {
  setCreateRoom,
  setDeleteRoom,
  setJoinRoom,
  setRooms,
} from "../../redux/slices/Rooms/rooms-slice";
import { AppDispatch } from "../../redux/store";
import { socket } from "../socket";
import { setAddMember } from "@Redux/slices/FamilyRoom/familyRoom-slice";

export const roomsListeners = (dispatch: AppDispatch) => {
  socket.on("recievedRooms", (rooms) => {
    console.log("recived rooms!");
    if (rooms.length > 0) {
      dispatch(setRooms(rooms));
      dispatch(setIncrementPage());
    } else {
      dispatch(setIsAllRooms(true));
    }

    dispatch(setIsIntersecting(false));

    dispatch(setLoading(false));
  });

  socket.on("recievedRoomsByName", (rooms) => {
    dispatch(setRooms(rooms));
    dispatch(setLoading(false));
  });

  socket.on("createdRoom", (newRoom) => {
    dispatch(setCreateRoom(newRoom));

    if (newRoom.isCreator) {
      dispatch(setHideModal());
      dispatch(setLoading(false));
      dispatch(setHideMenu());
      toast.success("Room Created Successfully!");
    }
  });

  socket.on("deletedRoom", ({ deletedRoomId, isDeleter }) => {
    dispatch(setDeleteRoom(deletedRoomId));
    if (isDeleter) {
      dispatch(setHideModal());
      dispatch(setLoading(false));
      toast.success("Room Deleted Successfully!");
    }
  });

  socket.on("joinedRoom", (data) => {
    const { roomId, newMember, toRoomMembers, toCurrentUser } = data;
    console.log("joinedRoom listener!");
    dispatch(setJoinRoom({ roomId, userId: newMember._id })); // Home page

    if (toCurrentUser) {
      dispatch(setHideModal());
      dispatch(setLoading(false));
      toast.success(`Joined room!`);
    }

    if (toRoomMembers) {
      dispatch(setAddMember(newMember)); // FamilyRoom page
    }
  });
};
