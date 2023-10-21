import { createSlice } from "@reduxjs/toolkit";
import { IRoom, IUser } from "@Types/index";

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
      console.log(newMember);
      state.familyRoom?.familyMembers.push(newMember);
    },

    setDeleteMember(state, { payload: memberId }) {
      if (state.familyRoom) {
        state.familyRoom.familyMembers = (
          state.familyRoom.familyMembers as IUser[]
        ).filter((member) => {
          return member._id !== memberId;
        });
      }
    },
    setCurrentUserRooms(state, { payload: userRooms }) {
      state.currentUserRooms = userRooms;
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
