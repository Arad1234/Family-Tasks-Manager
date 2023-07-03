import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, registerThunk } from "../actions/auth-actions";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
interface InitialState {
  username: string;
  email: string;
  password: string;
  loading: boolean;
  success: string | null;
  userId: string | null;
}

const initialState: InitialState = {
  username: "",
  email: "",
  password: "",
  loading: false,
  success: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsername(state, { payload }) {
      state.username = payload;
    },
    setEmail(state, { payload }) {
      state.email = payload;
    },
    setPassword(state, { payload }) {
      state.password = payload;
    },
    setLoading(state, { payload }) {
      state.loading = payload;
    },
    reset(state) {
      state.userId = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.userId = payload.userId;
        state.loading = false;
        state.success = "Success!";
      }),
      builder.addCase(loginThunk.rejected, (state) => {
        state.loading = false;
      });

    builder.addCase(registerThunk.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(registerThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = "Success!";
      }),
      builder.addCase(registerThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userId"],
};
const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const { setUsername, setEmail, setPassword, setLoading, reset } =
  authSlice.actions;

export default persistedAuthReducer;
