import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  option: "tasks" | "members";
}

const initialState: InitialState = {
  option: "tasks",
};
const roomOptionsSlice = createSlice({
  name: "roomOptions",
  initialState,
  reducers: {
    setOption(state, { payload }) {
      state.option = payload;
    },
  },
});

export const { setOption } = roomOptionsSlice.actions;

export default roomOptionsSlice.reducer;
