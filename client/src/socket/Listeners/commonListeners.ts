import { toast } from "react-toastify";

import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "@Redux/store";
import { socket } from "@Socket/socket";
import {
  setDeleteMember,
  setFamilyRoom,
} from "@Redux/slices/FamilyRoom/familyRoom-slice";
import { setHideModal, setOpenModal } from "@Redux/slices/Modal/modal-slice";
import { setHideMenu } from "@Redux/slices/BurgerMenu/burgerMenu-slice";
import { setLeaveRoom } from "@Redux/slices/Rooms/rooms-slice";
import { setLoading } from "@Redux/slices/Auth/auth-slice";
import { ADMIN_REMOVED_YOU_MODAL } from "@Utils/constants/modalStatusConstants";

export const commonListeners = (
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  locationPath: string
) => {
  socket.off("userLeftRoom");
  socket.off("memberDeletedByAdmin");

  // Two different listeners that implement the same state logic but generate different behavior for each user.
  socket.on("userLeftRoom", (data) => {
    const {
      memberId,
      username,
      roomName,
      roomId,
      toCurrentUser,
      toRoomMembers,
    } = data;
    dispatch(setDeleteMember(memberId));

    if (toCurrentUser) {
      dispatch(setFamilyRoom(null));
      dispatch(setHideModal());
      dispatch(setHideMenu());
      dispatch(setLoading(false));
      navigate("/home");
    }

    if (toRoomMembers) {
      toast.info(`${username} left "${roomName}" room`);
    }

    dispatch(setLeaveRoom({ roomId, userId: memberId }));
  });

  socket.on("memberDeletedByAdmin", (data) => {
    const {
      memberId,
      username,
      roomName,
      roomId,
      toRoomMembers,
      toRemovedMember,
    } = data;
    if (toRemovedMember) {
      if (locationPath.includes(roomId)) {
        navigate("/home");
        dispatch(setOpenModal(ADMIN_REMOVED_YOU_MODAL));
      }
    }
    if (toRoomMembers) {
      dispatch(setDeleteMember(memberId));
      toast.info(`${username} removed from "${roomName}"`);
      dispatch(setHideModal());
      dispatch(setLoading(false));
    }

    dispatch(setLeaveRoom({ roomId, userId: memberId }));
  });
};
// Two different listeners that implement the same state logic but generate different behavior for each user.
