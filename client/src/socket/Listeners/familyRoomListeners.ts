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
  socket.on("taskCreated", ({ newTask, userId }) => {
    dispatch(setAddTask({ newTask, userId }));

    dispatch(setHideModal());

    dispatch(setLoading(false));
    toast.success("Task Created Successfully!");
  });

  socket.on("recievedMemberRooms", (rooms) => {
    console.log("rooms", rooms);
    dispatch(setCurrentUserRooms(rooms));
    dispatch(setLoading(false));
  });

  socket.on("recievedFamilyRoom", (familyRoom) => {
    console.log("familyRoom", familyRoom);
    dispatch(setFamilyRoom(familyRoom));
    dispatch(setLoading(false));
  });
};
