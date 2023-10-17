import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isShowMenu: boolean;
}

const initialState: InitialState = {
  isShowMenu: false,
};

const burgerMenuSlice = createSlice({
  name: "burgerMenu",
  initialState,
  reducers: {
    setOpenMenu(state) {
      state.isShowMenu = true;
    },
    setHideMenu(state) {
      state.isShowMenu = false;
    },
  },
});

export const { setHideMenu, setOpenMenu } = burgerMenuSlice.actions;

export default burgerMenuSlice.reducer;
