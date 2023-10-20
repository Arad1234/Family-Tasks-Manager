import { commonListeners } from "@Socket/Listeners/commonListeners";
import { errorListeners } from "@Socket/Listeners/errorListeners";
import connectionListeners from "@Socket/Listeners/connectionListeners";
import { familyRoomListeners } from "@Socket/Listeners/familyRoomListeners";
import { roomsListeners } from "@Socket/Listeners/roomsListeners";
import {
  INITIALIZE_COMMON_LISTENERS,
  INITIALIZE_CONNECTION_LISENERS,
  INITIALIZE_ERROR_LISTENERS,
} from "@Utils/constants/actionTypeConstants";
import { Middleware } from "@reduxjs/toolkit";

export const initializeListenersMiddleware: Middleware = (storeAPI) => {
  const { dispatch, getState } = storeAPI;

  familyRoomListeners(dispatch);

  roomsListeners(dispatch);

  let isInitializeConnection = false;
  let isInitializeCommon = false;
  let isInitializeError = false;

  return (next) => (action) => {
    const state = getState();

    const { userId } = state.authReducer;

    const { type, payload } = action;

    switch (type) {
      case INITIALIZE_CONNECTION_LISENERS:
        if (userId && !isInitializeConnection) {
          connectionListeners(userId);
          isInitializeConnection = true;
        }
        break;

      case INITIALIZE_COMMON_LISTENERS:
        if (!isInitializeCommon) {
          commonListeners(dispatch, payload.navigate, payload.location);
          isInitializeCommon = true;
        }
        break;

      case INITIALIZE_ERROR_LISTENERS:
        if (!isInitializeError) {
          errorListeners(dispatch, payload.navigate);
          isInitializeError = true;
        }
        break;
    }
    next(action);
  };
};
