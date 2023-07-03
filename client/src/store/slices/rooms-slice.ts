import { createSlice } from "@reduxjs/toolkit";
import { createRoomThunk, getRoomsThunk } from "../actions/rooms-actions";

interface Room {
  roomName: string;
  creator: string;
  familyMembers: string[];
  maxMembers: number;
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoomsThunk.fulfilled, (state, { payload }) => {
      state.rooms = payload.rooms;
    });
    builder.addCase(createRoomThunk.fulfilled, (state, { payload }) => {});
  },
});

export default roomSlice.reducer;
