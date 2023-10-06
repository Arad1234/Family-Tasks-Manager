import { Socket } from "socket.io-client";
import { AppDispatch } from "../../redux/store";
import { setJoinRoom } from "../../redux/slices/Rooms/rooms-slice";
import { setLoading } from "../../redux/slices/Auth/auth-slice";
import { toast } from "react-toastify";
import { setDeleteMember } from "../../redux/slices/FamilyRoom/familyRoom-slice";
import { setHideModal } from "../../redux/slices/Modal/modal-slice";

export const commonListeners = (socket: Socket, dispatch: AppDispatch) => {
  socket.on("joinedRoom", (data) => {
    const { roomId, username, userId } = data;

    dispatch(setJoinRoom({ roomId, username, userId }));
    dispatch(setHideModal());

    dispatch(setLoading(false));
    toast.success("Joined Room!");
  });

  socket.on("memberDeleted", (data) => {
    const memberId = data;

    dispatch(setDeleteMember({ memberIdToDelete: memberId }));
    dispatch(setHideModal());
    dispatch(setLoading(false));
    toast.success("Member Deleted Successfully!");
  });
};
