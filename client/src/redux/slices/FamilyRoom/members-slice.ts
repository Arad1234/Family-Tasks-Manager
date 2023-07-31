import { createSlice } from "@reduxjs/toolkit";
import { IMember } from "../../../types";

interface InitialState {
  members: IMember[];
  selectedMember: IMember | null;
  memberToAssignTask: IMember | null;
}

const initialState: InitialState = {
  members: [],
  selectedMember: null,
  memberToAssignTask: null,
};

const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    setSelectedMember(state, { payload: selectedMember }) {
      state.selectedMember = selectedMember;
    },
    setMemberToAssignTask(state, { payload: memberToAssignTask }) {
      state.memberToAssignTask = memberToAssignTask;
    },
  },
});

export const { setSelectedMember, setMemberToAssignTask } =
  membersSlice.actions;

export default membersSlice.reducer;
