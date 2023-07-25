import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import persistRoomsReducer from "./slices/Rooms/rooms-slice";
import persistedAuthReducer from "./slices/Auth/auth-slice";
import modalSliceReducer from "./slices/Modal/modal-slice";
import createRoomSliceReducer from "./slices/Rooms/create-room";
import joinRoomSliceReducer from "./slices/Rooms/join-room";
import roomOptionsSliceReducer from "./slices/FamilyRoom/roomOptions-slice";
import createTaskSliceReducer from "./slices/FamilyRoom/createTask-slice";

export const store = configureStore({
  reducer: {
    authReducer: persistedAuthReducer,
    roomsReducer: persistRoomsReducer,
    modalReducer: modalSliceReducer,
    createRoomReducer: createRoomSliceReducer,
    joinRoomReducer: joinRoomSliceReducer,
    roomOptionsReducer: roomOptionsSliceReducer,
    createTaskReducer: createTaskSliceReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Give redux the option to make the store persistent throughout page reloads.
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
