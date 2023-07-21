import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  roomPassword: string;
}

const initialState: InitialState = {
  roomPassword: "",
};

const joinRoomSlice = createSlice({
  name: "joinRoom",
  initialState,
  reducers: {
    setRoomPassword(state, { payload }) {
      state.roomPassword = payload;
    },
  },
});

export const { setRoomPassword } = joinRoomSlice.actions;

export default joinRoomSlice.reducer;
