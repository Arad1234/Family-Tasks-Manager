import { createSlice } from "@reduxjs/toolkit";
import { IMember } from "../../../types";

interface InitialState {
  members: IMember[];
  selectedMember: IMember | null;
}

const initialState: InitialState = {
  members: [],
  selectedMember: null,
};

const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    setSelectedMember(state, { payload: selectedMember }) {
      state.selectedMember = selectedMember;
    },
  },
});

export const { setSelectedMember } = membersSlice.actions;

export default membersSlice.reducer;
