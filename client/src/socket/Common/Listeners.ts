import { Socket } from "socket.io-client";
import { AppDispatch } from "../../redux/store";
import {
  setJoinRoom,
  setLeaveRoom,
} from "../../redux/slices/Rooms/rooms-slice";
import { setLoading } from "../../redux/slices/Auth/auth-slice";
import { toast } from "react-toastify";
import {
  setDeleteMember,
  setFamilyRoom,
} from "../../redux/slices/FamilyRoom/familyRoom-slice";
import { setHideModal } from "../../redux/slices/Modal/modal-slice";
import { NavigateFunction } from "react-router-dom";

export const commonListeners = (
  socket: Socket,
  dispatch: AppDispatch,
  navigate?: NavigateFunction
) => {
  socket.on("joinedRoom", (data) => {
    const { roomId, username, userId } = data;

    dispatch(setJoinRoom({ roomId, username, userId }));
    dispatch(setHideModal());

    dispatch(setLoading(false));
    toast.success(`${username} Joined Room!`);
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

    dispatch(setDeleteMember(memberId));

    if (toCurrentUser) {
      dispatch(setFamilyRoom(null));
      dispatch(setHideModal());
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
