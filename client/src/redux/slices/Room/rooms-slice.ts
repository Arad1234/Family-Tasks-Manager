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
  roomId: string;
}

const initialState: InitialState = {
  rooms: [],
  roomId: "",
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRooms(state, { payload: allRooms }) {
      state.rooms = allRooms;
    },
    setCreateRoom(state, { payload: newRoom }) {
      console.log(newRoom);
      state.rooms.push(newRoom);
    },
    setDeleteRoom(state, { payload: roomId }) {
      console.log(roomId);
      state.rooms = state.rooms.filter((room) => {
        return room._id !== roomId;
      });
    },
    setJoinRoom(state, { payload }) {
      const { roomId, userName } = payload;
      state.rooms = state.rooms.map((room) => {
        if (room._id === roomId) {
          room.familyMembers.push(userName);
        }
        return room;
      });
    },
    setRoomId(state, { payload }) {
      state.roomId = payload;
    },
  },
});

export const {
  setRooms,
  setCreateRoom,
  setDeleteRoom,
  setJoinRoom,
  setRoomId,
} = roomSlice.actions;

export default roomSlice.reducer;
