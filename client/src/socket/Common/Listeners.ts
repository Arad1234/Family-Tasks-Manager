import { Socket } from "socket.io-client";
import { AppDispatch } from "../../redux/store";
import {
  setDeleteMember,
  setJoinRoom,
} from "../../redux/slices/Rooms/rooms-slice";
import { hideModal } from "../../utils/helpers/hideModal";
import { setLoading } from "../../redux/slices/Auth/auth-slice";
import { resetRoomPassword } from "../../redux/slices/Rooms/joinRoom-slice";
import { toast } from "react-toastify";

export const commonListeners = (socket: Socket, dispatch: AppDispatch) => {
  socket.on("joinedRoom", (data) => {
    const { roomId, username, userId } = data;

    dispatch(setJoinRoom({ roomId, username, userId }));
    dispatch(resetRoomPassword());
    hideModal(dispatch);
    dispatch(setLoading(false));
    toast.success("Joined Room!");
  });

  socket.on("memberDeleted", (data) => {
    const { memberId, roomId } = data;

    dispatch(setDeleteMember({ memberIdToDelete: memberId, roomId }));
    hideModal(dispatch);
    dispatch(setLoading(false));
    toast.success("Member Deleted Successfully!");
  });
};
