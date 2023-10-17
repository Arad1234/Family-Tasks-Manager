import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  page: number;
  isIntersecting: boolean;
  isAllRooms: boolean;
}

const initialState: InitialState = {
  page: 0,
  isIntersecting: false,
  isAllRooms: false,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setIncrementPage(state) {
      state.page += 1;
    },

    setIsIntersecting(state, { payload }) {
      state.isIntersecting = payload;
    },

    setIsAllRooms(state, { payload }) {
      state.isAllRooms = payload;
    },
  },
});

export const { setIncrementPage, setIsIntersecting, setIsAllRooms } =
  paginationSlice.actions;

export default paginationSlice.reducer;
