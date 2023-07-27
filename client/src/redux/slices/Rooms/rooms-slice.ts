import { createSlice } from "@reduxjs/toolkit";
import { IRoom } from "../../../types";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

interface InitialState {
  rooms: IRoom[];
  currentRoom: IRoom;
}

const initialState: InitialState = {
  rooms: [],
  currentRoom: {
    roomName: "",
    creator: { userId: "", username: "" },
    familyMembers: [],
    maxMembers: null,
    userId: "",
    _id: "",
  },
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
      const { room: joinedRoom, username, userId } = payload;
      state.rooms = state.rooms.map((room) => {
        if (room._id === joinedRoom._id) {
          room.familyMembers.push({ username, userId, tasks: [] });
        }
        return room;
      });
    },

    setAddTask(state, { payload }) {
      const { newTask, memberId } = payload;
      state.rooms = state.rooms.map((room) => {
        room.familyMembers.map((member) => {
          if (member.userId === memberId) {
            member.tasks.push(newTask);
            state.currentRoom = room; // Updating the current room with the new updated state, to reflect changes in the "Tasks" component UI.
          }
          return member;
        });
        return room;
      });
    },

    setCurrentRoom(state, { payload: roomId }) {
      const room = state.rooms.find((room) => room._id === roomId);
      if (room) {
        state.currentRoom = room;
      }
    },
  },
});

const persistConfig = {
  key: "rooms",
  storage,
  whiteList: ["rooms"],
};

const persistedRoomsReducer = persistReducer(persistConfig, roomsSlice.reducer);

export const {
  setRooms,
  setCreateRoom,
  setDeleteRoom,
  setJoinRoom,
  setCurrentRoom,
  setAddTask,
} = roomsSlice.actions;

export default persistedRoomsReducer;
