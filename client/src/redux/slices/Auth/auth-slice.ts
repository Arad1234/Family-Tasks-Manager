import { createSlice } from "@reduxjs/toolkit";
import {
  forgotPasswordThunk,
  loginThunk,
  registerThunk,
} from "../../actions/Auth/auth-actions";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

interface InitialState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  loading: boolean;
  success: string | null;
  userId: string | null;
}

const initialState: InitialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  loading: false,
  success: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
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
        state.username = payload.username;
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

    builder.addCase(forgotPasswordThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(forgotPasswordThunk.fulfilled, (state) => {
      state.success = "Success!";
    });
    builder.addCase(forgotPasswordThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

const persistConfig = {
  key: "userData",
  storage,
  whitelist: ["userId", "username"],
};
const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const { setLoading, reset } = authSlice.actions;

export default persistedAuthReducer;
