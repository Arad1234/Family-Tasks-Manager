import { createSlice } from "@reduxjs/toolkit";
import { IRoom } from "../../../types";

interface InitialState {
  rooms: IRoom[];
  currentUserRooms: IRoom[];
  familyRoom: IRoom | null;
  selectedRoom: IRoom | null;
}

const initialState: InitialState = {
  rooms: [],
  currentUserRooms: [],
  familyRoom: null,
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

    setDeleteMember(state, { payload }) {
      const { roomId, memberIdToDelete } = payload;
      state.rooms = state.rooms.map((room) => {
        if (room._id === roomId) {
          room.familyMembers = room.familyMembers.filter((memberId) => {
            return memberId !== memberIdToDelete;
          });
        }
        return room;
      });
    },
    setCurrentUserRooms(state, { payload }) {
      state.currentUserRooms = payload;
    },

    setAddTask(state, { payload }) {
      const { newTask, memberId, roomId } = payload;
      state.rooms = state.rooms.map((room) => {
        if (room._id === roomId) {
          room.familyMembers.map((member) => {
            if (member.userId === memberId) {
              member.tasks.push(newTask);
            }
          });
        }
        return room;
      });
    },
    setFamilyRoom(state, { payload: familyRoom }) {
      state.familyRoom = familyRoom;
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
  setAddTask,
  setDeleteMember,
  setCurrentUserRooms,
  setFamilyRoom,
} = roomsSlice.actions;

export default roomsSlice.reducer;
