import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRoom, ITask, IUser } from "@Types/index";

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

    setAddMember(state, { payload: newMember }: PayloadAction<IUser>) {
      console.log(newMember);
      state.familyRoom?.familyMembers.push(newMember);
    },

    setDeleteMember(state, { payload: memberId }: PayloadAction<string>) {
      if (state.familyRoom) {
        state.familyRoom.familyMembers = state.familyRoom.familyMembers.filter(
          (member) => {
            return member.userId !== memberId;
          }
        );
      }
    },
    setCurrentUserRooms(state, { payload: userRooms }) {
      state.currentUserRooms = userRooms;
    },

    setAddTask(
      state,
      { payload }: PayloadAction<{ newTask: ITask; userId: string }>
    ) {
      const { newTask, userId } = payload;

      if (state.familyRoom) {
        state.familyRoom.familyMembers =
          state.familyRoom.familyMembers.map<IUser>((member) => {
            if (member.userId === userId) {
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
