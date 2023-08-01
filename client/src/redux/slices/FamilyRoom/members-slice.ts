import { createSlice } from "@reduxjs/toolkit";
import { IMember } from "../../../types";

interface InitialState {
  members: IMember[];
  memberForTasks: IMember | null;
  memberForDelete: IMember | null;
  memberForAssignTask: IMember | null;
}

const initialState: InitialState = {
  members: [],
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
