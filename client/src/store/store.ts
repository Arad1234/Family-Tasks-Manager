import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/auth-slice";
export const store = configureStore({
  reducer: { authReducer: authSliceReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
