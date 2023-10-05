import { createSlice } from "@reduxjs/toolkit";
import { IRoom, IUser } from "../../../types";

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
      const { memberIdToDelete } = payload;
      console.log("payload", payload);
      if (state.familyRoom) {
        state.familyRoom.familyMembers = (
          state.familyRoom.familyMembers as IUser[]
        ).filter((member) => {
          return member._id !== memberIdToDelete;
        });
      }
    },
    setCurrentUserRooms(state, { payload }) {
      state.currentUserRooms = payload;
    },

    setAddTask(state, { payload }) {
      const { newTask, userId } = payload;

      console.log(newTask, userId);

      if (state.familyRoom) {
        state.familyRoom.familyMembers = (
          state.familyRoom.familyMembers as IUser[]
        ).map<IUser>((member) => {
          if (member._id === userId) {
            member.tasks.push(newTask);
          }
          return member;
        });
      }
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
