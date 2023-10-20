import { AppDispatch } from "../../redux/store";
import {
  setJoinRoom,
  setLeaveRoom,
} from "../../redux/slices/Rooms/rooms-slice";
import { setLoading } from "../../redux/slices/Auth/auth-slice";
import { toast } from "react-toastify";
import {
  setAddMember,
  setDeleteMember,
  setFamilyRoom,
} from "../../redux/slices/FamilyRoom/familyRoom-slice";
import { setHideModal } from "../../redux/slices/Modal/modal-slice";
import { NavigateFunction } from "react-router-dom";
import { socket } from "../socket";
import { setHideMenu } from "../../redux/slices/BurgerMenu/burgerMenu-slice";

export const commonListeners = (
  dispatch: AppDispatch,
  navigate?: NavigateFunction
) => {
  socket.on("joinedRoom", (data) => {
    const { roomId, newMember, toRoomMembers, toCurrentUser } = data;

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

  // Two different listeners that implement the same state logic but generate different behavior for each user.
  socket.on("userLeftRoom", (data) => {
    const {
      memberId,
      username,
      roomName,
      roomId,
      toCurrentUser,
      toAllUsers,
      toRoomMembers,
    } = data;
    console.log("user left room!");
    dispatch(setDeleteMember(memberId));

    if (toCurrentUser) {
      dispatch(setFamilyRoom(null));
      dispatch(setHideModal());
      dispatch(setHideMenu());
      navigate!("/home");
    }

    if (toRoomMembers) {
      toast.info(`${username} left "${roomName}" room`);
    }

    if (toAllUsers) {
      dispatch(setLeaveRoom({ roomId, userId: memberId }));
    }
  });

  socket.on("memberDeletedByAdmin", (data) => {
    const { memberId, username, roomName, roomId, toRoomMembers, toAllUsers } =
      data;

    if (toRoomMembers) {
      dispatch(setDeleteMember(memberId));
      toast.info(`${username} removed from "${roomName}"`);
      dispatch(setHideModal());
      dispatch(setLoading(false));
    }

    if (toAllUsers) {
      dispatch(setLeaveRoom({ roomId, userId: memberId }));
    }
  });
};
// Two different listeners that implement the same state logic but generate different behavior for each user.
