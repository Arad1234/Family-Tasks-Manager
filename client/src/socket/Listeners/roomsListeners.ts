import { toast } from "react-toastify";
import { socket } from "../socket";
import { setAddMember } from "@Redux/slices/FamilyRoom/familyRoom-slice";
import { AppDispatch } from "@Redux/store";
import {
  setCreateRoom,
  setDeleteRoom,
  setJoinRoom,
  setLoadingRooms,
  setRooms,
  setSearchedRooms,
} from "@Redux/slices/Rooms/rooms-slice";
import {
  setIncrementPage,
  setIsAllRooms,
  setIsIntersecting,
} from "@Redux/slices/Pagination/pagination-slice";
import { setLoading } from "@Redux/slices/Auth/auth-slice";
import { setHideModal } from "@Redux/slices/Modal/modal-slice";
import { setHideMenu } from "@Redux/slices/BurgerMenu/burgerMenu-slice";

export const roomsListeners = (dispatch: AppDispatch) => {
  socket.off("recievedRooms");
  socket.off("recievedRoomsByName");
  socket.off("createdRoom");
  socket.off("deletedRoom");
  socket.off("joinedRoom");

  socket.on("recievedRooms", (rooms) => {
    if (rooms.length > 0) {
      dispatch(setRooms(rooms));
      dispatch(setIncrementPage());
    } else {
      dispatch(setIsAllRooms(true));
    }

    dispatch(setIsIntersecting(false));

    dispatch(setLoadingRooms(false));
  });

  socket.on("recievedRoomsByName", (rooms) => {
    dispatch(setSearchedRooms(rooms));
    dispatch(setLoadingRooms(false));
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

    dispatch(setJoinRoom({ roomId, newMember })); // Home page

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
