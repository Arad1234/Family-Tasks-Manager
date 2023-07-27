import { Socket } from "socket.io-client";
import { AppDispatch } from "../../redux/store";
import { setLoading } from "../../redux/slices/Auth/auth-slice";
import { setAddTask } from "../../redux/slices/Rooms/rooms-slice";

export const familyRoomListeners = (socket: Socket, dispatch: AppDispatch) => {
  socket.on("taskCreated", (data) => {
    const { newTask, memberId } = data;
    dispatch(setAddTask({ newTask, memberId }));
    dispatch(setLoading(false));
  });
};
