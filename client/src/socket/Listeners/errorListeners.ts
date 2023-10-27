import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { socket } from "../socket";
import { AppDispatch } from "@Redux/store";
import { setLoading } from "@Redux/slices/Auth/auth-slice";

export const errorListeners = (
  dispatch: AppDispatch,
  navigate: NavigateFunction
) => {
  socket.off("error");
  socket.off("connect_error");
  socket.off("connect_timeout");

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
