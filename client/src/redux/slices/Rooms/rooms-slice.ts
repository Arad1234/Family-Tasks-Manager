import { createSlice } from "@reduxjs/toolkit";
import { IRoom, IUser } from "../../../types";

interface InitialState {
  rooms: IRoom[];
  selectedRoom: IRoom | null;
  page: number;
}

const initialState: InitialState = {
  rooms: [],
  selectedRoom: null,
  page: 0,
};

const roomsSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRooms(state, { payload: allRooms }) {
      state.rooms = [...state.rooms, ...allRooms];
      // state.rooms = allRooms;
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

    setLeaveRoom(state, { payload }) {
      const { roomId, userId } = payload;

      state.rooms = state.rooms.map((room) => {
        if (room._id === roomId) {
          room.familyMembers = (room.familyMembers as IUser[]).filter(
            (memberId) => {
              return memberId !== userId;
            }
          );
        }
        return room;
      });
    },

    setSelectedRoom(state, { payload: room }) {
      state.selectedRoom = room;
    },

    setIncrementPage(state) {
      state.page += 1;
    },
  },
});

export const {
  setRooms,
  setCreateRoom,
  setDeleteRoom,
  setJoinRoom,
  setLeaveRoom,
  setSelectedRoom,
  setIncrementPage,
} = roomsSlice.actions;

export default roomsSlice.reducer;
