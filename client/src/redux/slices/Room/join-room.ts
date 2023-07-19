import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  roomPassword: string;
  roomId: string;
}

const initialState: InitialState = {
  roomPassword: "",
  roomId: "",
};

const joinRoomSlice = createSlice({
  name: "joinRoom",
  initialState,
  reducers: {
    setRoomPassword(state, { payload }) {
      state.roomPassword = payload;
    },
    setRoomId(state, { payload }) {
      state.roomId = payload;
    },
  },
});

export const { setRoomPassword, setRoomId } = joinRoomSlice.actions;

export default joinRoomSlice.reducer;
