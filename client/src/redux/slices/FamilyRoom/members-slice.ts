import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@Types/index";

interface InitialState {
  memberForTasks: IUser | null;
  memberForDelete: IUser | string | null;
  memberForAssignTask: IUser | null;
}

const initialState: InitialState = {
  memberForTasks: null,
  memberForDelete: null,
  memberForAssignTask: null,
};

const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    setMemberForTasks(state, { payload: selectedMember }) {
      state.memberForTasks = selectedMember;
    },
    setMemberForDelete(state, { payload: selectedMember }) {
      state.memberForDelete = selectedMember;
    },
    setMemberForAssignTask(state, { payload: selectedMember }) {
      state.memberForAssignTask = selectedMember;
    },
  },
});

export const { setMemberForTasks, setMemberForDelete, setMemberForAssignTask } =
  membersSlice.actions;

export default membersSlice.reducer;
