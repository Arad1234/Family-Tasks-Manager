import { AppDispatch } from "../../redux/store";
import { setLoading } from "../../redux/slices/Auth/auth-slice";
import {
  setAddTask,
  setFamilyRoom,
  setCurrentUserRooms,
} from "../../redux/slices/FamilyRoom/familyRoom-slice";
import { toast } from "react-toastify";
import { setHideModal } from "../../redux/slices/Modal/modal-slice";
import { socket } from "../socket";

export const familyRoomListeners = (dispatch: AppDispatch) => {
  socket.on("taskCreated", (data) => {
    const { newTask, userId } = data;

    dispatch(setAddTask({ newTask, userId }));

    dispatch(setHideModal());

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
    console.log("familyRoom", familyRoom);
    dispatch(setFamilyRoom(familyRoom));
    dispatch(setLoading(false));
  });
};
