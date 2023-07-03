import { configureStore } from "@reduxjs/toolkit";
import roomsSliceReducer from "./slices/rooms-slice";
import { persistStore } from "redux-persist";
import persistedAuthReducer from "./slices/auth-slice";

export const store = configureStore({
  reducer: {
    authReducer: persistedAuthReducer,
    roomsReducer: roomsSliceReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Give redux the option to make the store persistent throughout page reloads.
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
