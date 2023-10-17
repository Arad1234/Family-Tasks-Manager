import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { setLoading } from "../../redux/slices/Auth/auth-slice";
import { toast } from "react-toastify";
import { socket } from "../socket";

export const errorListeners = (
  navigate: NavigateFunction,
  dispatch: AppDispatch
) => {
  socket.on("error", (err) => {
    console.log(err);
    toast.error(err.message);
    dispatch(setLoading(false));
  });

  socket.on("connect_error", (err) => {
    if (err.message.includes("jwt")) {
      navigate("/");
    }
    toast.error(err.message);
    dispatch(setLoading(false));
  });

  socket.on("connect_timeout", (timeout) => {
    console.log("Connection timeout:", timeout);
  });
};
