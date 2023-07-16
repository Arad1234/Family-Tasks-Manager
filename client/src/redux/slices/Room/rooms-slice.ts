import { createSlice } from "@reduxjs/toolkit";
import {
  createRoomThunk,
  getRoomsThunk,
} from "../../actions/Room/rooms-actions";

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoomsThunk.fulfilled, (state, { payload }) => {
      console.log(payload.rooms);
      state.rooms = payload.rooms;
    });
    builder.addCase(createRoomThunk.fulfilled, (state, { payload }) => {
      state.rooms.push(payload.newRoom);
    });
  },
});

export default roomSlice.reducer;
