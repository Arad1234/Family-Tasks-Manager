import { setLoading } from "@Redux/slices/Auth/auth-slice";
import { socket } from "@Socket/socket";
import {
  ADD_TASK_SOCKET,
  GET_CURRENT_ROOM_SOCKET,
  GET_MEMBER_ROOMS_SOCKET,
} from "@Utils/constants/actionTypeConstants";
import { Middleware } from "@reduxjs/toolkit";

export const familyRoomSocketMiddleware: Middleware =
  (storeAPI) => (next) => (action) => {
    const { dispatch } = storeAPI;
    const { type, payload } = action;

    switch (type) {
      case GET_MEMBER_ROOMS_SOCKET:
        socket.emit("members:getRooms", { ...payload });
        break;

      case GET_CURRENT_ROOM_SOCKET:
        dispatch(setLoading(true));
        socket.emit("members:getCurrentRoom", { ...payload });
        break;

      case ADD_TASK_SOCKET:
        dispatch(setLoading(true));
        socket.emit("tasks:create", { ...payload });
        break;
    }

    next(action);
  };
