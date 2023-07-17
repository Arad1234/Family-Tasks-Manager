import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isOpen: boolean;
  status: string;
}
const initialState: InitialState = {
  isOpen: false,
  status: "",
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsOpen(state, { payload }) {
      state.isOpen = payload.isOpen;
      state.status = payload.status;
    },
  },
});

export const { setIsOpen } = modalSlice.actions;

export default modalSlice.reducer;
