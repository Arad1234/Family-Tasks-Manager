import { Socket } from "socket.io-client";
import { AppDispatch } from "../../redux/store";
import { setDeleteMember } from "../../redux/slices/Rooms/rooms-slice";
import { hideModal } from "../../utils/helpers/hideModal";
import { setLoading } from "../../redux/slices/Auth/auth-slice";

export const commonListeners = (socket: Socket, dispatch: AppDispatch) => {
  socket.on("memberDeleted", (data) => {
    const { memberId, roomId } = data;

    dispatch(setDeleteMember({ memberId, roomId }));
    hideModal(dispatch);
    dispatch(setLoading(false));
  });
};
