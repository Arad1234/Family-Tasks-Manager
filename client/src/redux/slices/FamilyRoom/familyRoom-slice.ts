import { createSlice } from "@reduxjs/toolkit";
import { IRoom, IUser } from "../../../types";

interface InitialState {
  currentUserRooms: IRoom[];
  familyRoom: IRoom | null;
}

const initialState: InitialState = {
  currentUserRooms: [],
  familyRoom: null,
};

const familyRoomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setFamilyRoom(state, { payload: familyRoom }) {
      state.familyRoom = familyRoom;
    },

    setAddMember(state, { payload: newMember }) {
      state.familyRoom?.familyMembers.push(newMember);
    },

    setDeleteMember(state, { payload }) {
      const memberId = payload;

      if (state.familyRoom) {
        state.familyRoom.familyMembers = (
          state.familyRoom.familyMembers as IUser[]
        ).filter((member) => {
          return member._id !== memberId;
        });
      }
    },
    setCurrentUserRooms(state, { payload }) {
      state.currentUserRooms = payload;
    },

    setAddTask(state, { payload }) {
      const { newTask, userId } = payload;

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
  },
});

export const {
  setAddTask,
  setDeleteMember,
  setCurrentUserRooms,
  setFamilyRoom,
  setAddMember,
} = familyRoomSlice.actions;

export default familyRoomSlice.reducer;
