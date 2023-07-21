import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isOpen: boolean;
  modalStatus: string;
}
const initialState: InitialState = {
  isOpen: false,
  modalStatus: "",
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setShowModal(state, { payload }) {
      state.isOpen = payload.isOpen;
      state.modalStatus = payload.modalStatus;
    },
  },
});

export const { setShowModal } = modalSlice.actions;

export default modalSlice.reducer;
