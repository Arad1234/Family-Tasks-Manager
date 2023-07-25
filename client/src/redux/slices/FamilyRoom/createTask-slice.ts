import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../../types";

const initialState: ITask = {
  name: "",
  description: "",
  timeToDo: null,
};

const createTaskSlice = createSlice({
  name: "createTask",
  initialState,
  reducers: {
    setTaskName(state, { payload }) {
      state.name = payload;
    },
    setTaskDescription(state, { payload }) {
      state.name = payload;
    },
    setTaskTime(state, { payload }) {
      state.name = payload;
    },
  },
});

export const { setTaskDescription, setTaskName, setTaskTime } =
  createTaskSlice.actions;

export default createTaskSlice.reducer;
