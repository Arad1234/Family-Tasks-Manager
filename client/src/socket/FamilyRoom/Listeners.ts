import { Socket } from "socket.io-client";
import { AppDispatch } from "../../redux/store";
import { setLoading } from "../../redux/slices/Auth/auth-slice";
import { setAddTask } from "../../redux/slices/Rooms/rooms-slice";
import { resetTaskDetails } from "../../redux/slices/FamilyRoom/createTask-slice";
import { hideModal } from "../../utils/helpers/hideModal";

export const familyRoomListeners = (socket: Socket, dispatch: AppDispatch) => {
  socket.on("taskCreated", (data) => {
    const { newTask, memberId, roomId } = data;

    dispatch(setAddTask({ newTask, memberId, roomId }));
    hideModal(dispatch);
    dispatch(resetTaskDetails());
    dispatch(setLoading(false));
  });
};
