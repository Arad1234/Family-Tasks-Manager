import { createSlice } from "@reduxjs/toolkit";

interface Room {
  roomName: string;
  creator: string;
  familyMembers: string[];
  maxMembers: number;
  _id: string;
}

interface InitialState {
  rooms: Room[];
}

const initialState: InitialState = {
  rooms: [],
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRooms(state, { payload }) {
      state.rooms = payload;
    },
    setCreateRoom(state, { payload }) {
      state.rooms.push(payload);
    },
  },
});

export const { setRooms, setCreateRoom } = roomSlice.actions;

export default roomSlice.reducer;
