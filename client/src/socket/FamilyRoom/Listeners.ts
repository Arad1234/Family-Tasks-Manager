import { Socket } from "socket.io-client";
import { AppDispatch } from "../../redux/store";
import { setLoading } from "../../redux/slices/Auth/auth-slice";
import {
  setAddTask,
  setFamilyRoom,
  setCurrentUserRooms,
} from "../../redux/slices/Rooms/rooms-slice";
import { resetTaskDetails } from "../../redux/slices/FamilyRoom/createTask-slice";
import { hideModal } from "../../utils/helpers/hideModal";
import { toast } from "react-toastify";

export const familyRoomListeners = (socket: Socket, dispatch: AppDispatch) => {
  socket.on("taskCreated", (data) => {
    const { newTask, userId } = data;
    console.log(newTask, userId);
    dispatch(setAddTask({ newTask, userId }));
    hideModal(dispatch);
    dispatch(resetTaskDetails());
    dispatch(setLoading(false));
    toast.success("Task Created Successfully!");
  });

  socket.on("recievedMemberRooms", (data) => {
    const rooms = data;
    dispatch(setCurrentUserRooms(rooms));
    dispatch(setLoading(false));
  });

  socket.on("recievedFamilyRoom", (data) => {
    const familyRoom = data;

    dispatch(setFamilyRoom(familyRoom));
    dispatch(setLoading(false));
  });
};
