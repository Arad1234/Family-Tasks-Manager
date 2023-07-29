import { createSlice } from "@reduxjs/toolkit";
import { TaskCreation } from "../../../types";

const initialState: TaskCreation = {
  name: "",
  description: "",
  startTime: null,
  endTime: null,
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
    setTaskStartTime(state, { payload }) {
      state.startTime = payload === "" ? null : payload;
    },
    setTaskEndTime(state, { payload }) {
      state.endTime = payload === "" ? null : payload;
    },
    resetTaskDetails(state) {
      state.name = "";
      state.description = "";
      state.startTime = null;
      state.endTime = null;
    },
  },
});

export const {
  setTaskDescription,
  setTaskName,
  setTaskStartTime,
  setTaskEndTime,
  resetTaskDetails,
} = createTaskSlice.actions;

export default createTaskSlice.reducer;
