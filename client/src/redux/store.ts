import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import persistedRoomsSliceReducer from "./slices/Rooms/rooms-slice";
import persistedAuthReducer from "./slices/Auth/auth-slice";
import modalSliceReducer from "./slices/Modal/modal-slice";
import createRoomSliceReducer from "./slices/Rooms/createRoom-slice";
import joinRoomSliceReducer from "./slices/Rooms/joinRoom-slice";
import roomOptionsSliceReducer from "./slices/FamilyRoom/roomOptions-slice";
import createTaskSliceReducer from "./slices/FamilyRoom/createTask-slice";
import calendarEventsSliceReducer from "./slices/CalendarEvents/CalendarEvents";
import membersSliceReducer from "./slices/FamilyRoom/members-slice";

export const store = configureStore({
  reducer: {
    authReducer: persistedAuthReducer,
    roomsReducer: persistedRoomsSliceReducer,
    modalReducer: modalSliceReducer,
    createRoomReducer: createRoomSliceReducer,
    joinRoomReducer: joinRoomSliceReducer,
    roomOptionsReducer: roomOptionsSliceReducer,
    createTaskReducer: createTaskSliceReducer,
    calendarEventsReducer: calendarEventsSliceReducer,
    membersReducer: membersSliceReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Give redux the option to make the store persistent throughout page reloads.
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
