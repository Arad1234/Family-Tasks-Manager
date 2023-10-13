import { Location, NavigateFunction } from "react-router-dom";
import { socket } from "../socket";
import { AppDispatch } from "../../redux/store";
import { setOpenModal } from "../../redux/slices/Modal/modal-slice";

const socketIDListeners = (
  location: Location,
  navigate: NavigateFunction,
  dispatch: AppDispatch
) => {
  socket.on("removedFromRoom", (data) => {
    const roomId = data;
    // If location pathname includes the roomId, the user will be navigated automatically to the home page.
    if (location.pathname.includes(roomId)) {
      navigate("/home");
      dispatch(setOpenModal("adminRemovedYou"));
    }
  });
};

export default socketIDListeners;
