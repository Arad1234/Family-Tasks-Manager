import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  eventsIdList: string[];
}

const initialState: InitialState = {
  eventsIdList: [],
};
const calendarEventsSlice = createSlice({
  name: "calendarEvents",
  initialState,
  reducers: {
    setEventsId(state, { payload: eventsList }) {
      const idList = eventsList.map((event: any) => event.id);
      state.eventsIdList = idList;
    },
    setAddGoogleEvent(state, { payload: eventId }) {
      state.eventsIdList.push(eventId);
    },
    setDeleteGoogleEvent(state, { payload: deletedEventId }) {
      state.eventsIdList = state.eventsIdList.filter(
        (eventId) => eventId !== deletedEventId
      );
    },
  },
});

export const { setEventsId, setAddGoogleEvent, setDeleteGoogleEvent } =
  calendarEventsSlice.actions;

export default calendarEventsSlice.reducer;
