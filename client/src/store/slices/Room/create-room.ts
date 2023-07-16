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
    resetRoom(state) {
      state.roomName = "";
      state.maxMembers = null;
    },
  },
});

export const { setMaxMembers, setRoomName, resetRoom } =
  createRoomSlice.actions;

export default createRoomSlice.reducer;
