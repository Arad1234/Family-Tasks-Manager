import { createSlice } from "@reduxjs/toolkit";
interface InitialState {
  roomName: string;
  roomPassword: string;
  maxMembers: number | null;
}

const initialState: InitialState = {
  roomName: "",
  roomPassword: "",
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
    setPassword(state, { payload }) {
      state.roomPassword = payload;
    },
    resetRoomDetails(state) {
      state.roomName = "";
      state.roomPassword = "";
      state.maxMembers = null;
    },
  },
});

export const { setMaxMembers, setRoomName, resetRoomDetails, setPassword } =
  createRoomSlice.actions;

export default createRoomSlice.reducer;
