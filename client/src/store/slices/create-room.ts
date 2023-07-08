import { createSlice } from "@reduxjs/toolkit";
interface InitialState {
  roomName: string;
  maxMembers: number | null;
}

const initialState: InitialState = {
  roomName: "",
  maxMembers: null,
};
const createRoomSlice = createSlice({
  name: "createRoom",
  initialState,
  reducers: {
    setRoomName(state, { payload }) {
      state.roomName = payload;
    },
    setMaxMembers(state, { payload }) {
      state.maxMembers = payload;
    },
  },
});

export const { setMaxMembers, setRoomName } = createRoomSlice.actions;

export default createRoomSlice.reducer;
