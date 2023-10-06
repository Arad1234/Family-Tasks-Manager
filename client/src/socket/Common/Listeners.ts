import { Socket } from "socket.io-client";
import { AppDispatch } from "../../redux/store";
import { setJoinRoom } from "../../redux/slices/Rooms/rooms-slice";
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

  socket.on("userLeftRoom", (data) => {
    const memberId = data;
    dispatch(setFamilyRoom(null));

    dispatch(setDeleteMember({ memberIdToDelete: memberId }));
    dispatch(setHideModal());
    dispatch(setLoading(false));

    if (navigate) {
      navigate("/home");
    }

    toast.success("Left Room Successfully!");
  });

  socket.on("memberDeletedByAdmin", (data) => {
    const memberId = data;
    dispatch(setFamilyRoom(null));

    dispatch(setDeleteMember({ memberIdToDelete: memberId }));
    dispatch(setHideModal());
    dispatch(setLoading(false));

    if (navigate) {
      navigate("/home");
    }

    toast.success("Member Deleted Successfully!");
  });
};
