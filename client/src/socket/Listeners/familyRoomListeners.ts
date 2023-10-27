import { AppDispatch } from "@Redux/store";
import { setLoading } from "@Redux/slices/Auth/auth-slice";
import {
  setAddTask,
  setFamilyRoom,
  setCurrentUserRooms,
} from "@Redux/slices/FamilyRoom/familyRoom-slice";
import { toast } from "react-toastify";
import { setHideModal } from "@Redux/slices/Modal/modal-slice";
import { socket } from "../socket";

export const familyRoomListeners = (dispatch: AppDispatch) => {
  socket.off("taskCreated");
  socket.off("recievedMemberRooms");
  socket.off("recievedFamilyRoom");

  socket.on("taskCreated", ({ newTask, userId }) => {
    dispatch(setAddTask({ newTask, userId }));

    dispatch(setHideModal());

    dispatch(setLoading(false));
    toast.success("Task Created Successfully!");
  });

  socket.on("recievedMemberRooms", (rooms) => {
    dispatch(setCurrentUserRooms(rooms));
    dispatch(setLoading(false));
  });

  socket.on("recievedFamilyRoom", (familyRoom) => {
    dispatch(setFamilyRoom(familyRoom));
    dispatch(setLoading(false));
  });
};
