import { createSlice } from "@reduxjs/toolkit";

interface Room {
  roomName: string;
  creator: string;
  familyMembers: string[];
  maxMembers: number;
  userId: string;
  _id: string;
}

interface InitialState {
  rooms: Room[];
  filteredRooms: Room[];
}

const initialState: InitialState = {
  rooms: [],
  filteredRooms: [],
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRooms(state, { payload }) {
      state.rooms = payload;
      state.filteredRooms = payload;
    },
    setCreateRoom(state, { payload }) {
      console.log(payload);
      state.rooms.push(payload);
      state.filteredRooms.push(payload);
    },
    setSearchRooms(state, { payload }) {
      state.filteredRooms = state.rooms.filter((room) => {
        console.log(payload);
        return room.roomName.includes(payload);
      });
    },
  },
});

export const { setRooms, setCreateRoom, setSearchRooms } = roomSlice.actions;

export default roomSlice.reducer;
