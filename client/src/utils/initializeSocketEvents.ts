import { Socket } from "socket.io-client";
import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { setLoading } from "../redux/slices/Auth/auth-slice";

export const initializeErrorSocket = (
  socket: Socket,
  navigate: NavigateFunction,
  dispatch: AppDispatch
) => {
  socket.on("error", (err) => {
    console.log(err);
    const { issues } = err;
    if (issues) {
      const [firstIssue] = issues;
      alert(firstIssue.message);
    } else {
      alert(err);
    }
    dispatch(setLoading(false));
  });

  socket.on("connect_error", (err) => {
    if (err.message.includes("jwt")) {
      navigate("/");
    }
    console.log(err);
    dispatch(setLoading(false));
  });
};
