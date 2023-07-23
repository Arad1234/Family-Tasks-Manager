import { createSlice } from "@reduxjs/toolkit";

interface Room {
  roomName: string;
  creator: string;
  familyMembers: { username: string; userId: string }[];
  maxMembers: number | null;
  userId: string;
  _id: string;
}

interface InitialState {
  rooms: Room[];
  currentRoom: Room;
}

const initialState: InitialState = {
  rooms: [],
  currentRoom: {
    roomName: "",
    creator: "",
    familyMembers: [],
    maxMembers: null,
    userId: "",
    _id: "",
  },
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
    setDeleteRoom(state, { payload: deletedRoom }) {
      console.log(deletedRoom);
      state.rooms = state.rooms.filter((room) => {
        return room._id !== deletedRoom._id;
      });
    },
    setJoinRoom(state, { payload }) {
      const { room: joinedRoom, username, userId } = payload;
      state.rooms = state.rooms.map((room) => {
        if (room._id === joinedRoom._id) {
          room.familyMembers.push({ username, userId });
        }
        return room;
      });
    },
    setCurrentRoom(state, { payload }) {
      state.currentRoom = payload;
    },
  },
});

export const {
  setRooms,
  setCreateRoom,
  setDeleteRoom,
  setJoinRoom,
  setCurrentRoom,
} = roomSlice.actions;

export default roomSlice.reducer;
