import { createSlice } from "@reduxjs/toolkit";
import { IRoom } from "../../../types";

interface InitialState {
  rooms: IRoom[];
  selectedRoom: IRoom | null;
}

const initialState: InitialState = {
  rooms: [],
  selectedRoom: null,
};

const roomsSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRooms(state, { payload: allRooms }) {
      state.rooms = allRooms;
    },
    setCreateRoom(state, { payload: newRoom }) {
      state.rooms.push(newRoom);
    },
    setDeleteRoom(state, { payload: deletedRoomId }) {
      state.rooms = state.rooms.filter((room) => {
        return room._id !== deletedRoomId;
      });
    },
    setJoinRoom(state, { payload }) {
      const { roomId: joinedRoomId, userId } = payload;
      state.rooms = state.rooms.map((room) => {
        if (room._id === joinedRoomId) {
          room.familyMembers.push(userId);
        }
        return room;
      });
    },

    setSelectedRoom(state, { payload: room }) {
      state.selectedRoom = room;
    },
  },
});

export const {
  setRooms,
  setCreateRoom,
  setDeleteRoom,
  setJoinRoom,
  setSelectedRoom,
} = roomsSlice.actions;

export default roomsSlice.reducer;
