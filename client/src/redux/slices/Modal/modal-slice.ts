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
    setOpenModal(state, { payload }) {
      state.isOpen = true;
      state.modalStatus = payload;
    },

    setHideModal(state) {
      state.isOpen = false;
      state.modalStatus = "";
    },
  },
});

export const { setOpenModal, setHideModal } = modalSlice.actions;

export default modalSlice.reducer;
