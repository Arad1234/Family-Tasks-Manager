import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../actions/auth-actions";
interface InitialState {
  username: string;
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: InitialState = {
  username: "",
  email: "",
  password: "",
  loading: false,
  error: null,
  success: null,
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
  },

  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(loginThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = "Success!";
      }),
      builder.addCase(loginThunk.rejected, (state, action) => {
        state.error = action.error as any;
        state.loading = false;
      });
  },
});

export const { setUsername, setEmail, setPassword } = authSlice.actions;

export default authSlice.reducer;
