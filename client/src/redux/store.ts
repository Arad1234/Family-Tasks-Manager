import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import roomsSliceReducer from "./slices/Room/rooms-slice";
import persistedAuthReducer from "./slices/Auth/auth-slice";
import modalSliceReducer from "./slices/Modal/modal-slice";
import createRoomSliceReducer from "./slices/Room/create-room";
import joinRoomSliceReducer from "./slices/Room/join-room";
import roomOptionsSliceReducer from "./slices/RoomOptions/roomOptions-slice";
export const store = configureStore({
  reducer: {
    authReducer: persistedAuthReducer,
    roomsReducer: roomsSliceReducer,
    modalReducer: modalSliceReducer,
    createRoomReducer: createRoomSliceReducer,
    joinRoomReducer: joinRoomSliceReducer,
    roomOptionsReducer: roomOptionsSliceReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Give redux the option to make the store persistent throughout page reloads.
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
