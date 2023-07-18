import { Socket } from "socket.io-client";
import { AppDispatch } from "../redux/store";
import { NavigateFunction } from "react-router-dom";
import { setCreateRoom, setRooms } from "../redux/slices/Room/rooms-slice";

export const initializeSocketEvents = (
  socket: Socket,
  navigate: NavigateFunction,
  dispatch: AppDispatch
) => {
  socket.on("recievedRooms", (data) => {
    dispatch(setRooms(data));
  });

  socket.on("createdRoom", (data) => {
    dispatch(setCreateRoom(data));
  });

  socket.on("error", (err) => {
    console.log(err);
    const { issues } = err;
    if (issues) {
      const [firstIssue] = issues;
      alert(firstIssue.message);
    } else {
      alert(err.message);
    }
  });

  socket.on("connect_error", (err) => {
    if (err.message.includes("jwt")) {
      navigate("/");
    }
  });
};