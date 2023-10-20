import { Middleware } from "@reduxjs/toolkit";
import {
  CREATE_ROOM_SOCKET,
  DELETE_ROOM_SOCKET,
  GET_ROOMS_BY_NAME_SOCKET,
  GET_ROOMS_SOCKET,
  JOIN_ROOM_SOCKET,
  LEAVE_ROOM_SOCKET,
} from "../../utils/constants/actionTypeConstants";
import { setLoading } from "../slices/Auth/auth-slice";
import { socket } from "../../socket/socket";
import { setIsIntersecting } from "../slices/Pagination/pagination-slice";

export const roomsSocketMiddleware: Middleware =
  (storeAPI) => (next) => (action) => {
    const { dispatch } = storeAPI;

    const { type, payload } = action;

    switch (type) {
      case GET_ROOMS_SOCKET:
        if (payload.isIntersecting) {
          dispatch(setIsIntersecting(true));
        } else {
          dispatch(setLoading(true));
        }

        socket.emit("rooms:read", { page: payload.page });
        break;

      case GET_ROOMS_BY_NAME_SOCKET:
        dispatch(setLoading(true));
        socket.emit("rooms:readByName", { searchQuery: payload.searchQuery });
        break;

      case CREATE_ROOM_SOCKET:
        dispatch(setLoading(true));

        socket.emit("rooms:create", { ...payload });
        break;

      case DELETE_ROOM_SOCKET:
        dispatch(setLoading(true));
        socket.emit("rooms:delete", { ...payload });
        break;

      case JOIN_ROOM_SOCKET:
        dispatch(setLoading(true));
        socket.emit("rooms:join", { ...payload });
        break;

      case LEAVE_ROOM_SOCKET:
        dispatch(setLoading(true));
        socket.emit("members:delete", { ...payload });
        break;
    }

    next(action);
  };
