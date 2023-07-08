import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isOpen: boolean;
}
const initialState: InitialState = {
  isOpen: false,
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsOpen(state, { payload }) {
      state.isOpen = payload;
    },
  },
});

export const { setIsOpen } = modalSlice.actions;

export default modalSlice.reducer;
