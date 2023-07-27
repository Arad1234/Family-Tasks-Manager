import { createSlice } from "@reduxjs/toolkit";
import { TaskCreation } from "../../../types";

const initialState: TaskCreation = {
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
      state.description = payload;
    },
    setTaskTime(state, { payload }) {
      state.timeToDo = payload;
    },
    resetTaskDetails(state) {
      state.name = "";
      state.description = "";
      state.timeToDo = null;
    },
  },
});

export const {
  setTaskDescription,
  setTaskName,
  setTaskTime,
  resetTaskDetails,
} = createTaskSlice.actions;

export default createTaskSlice.reducer;
