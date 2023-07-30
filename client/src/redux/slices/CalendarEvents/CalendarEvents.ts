import { createSlice } from "@reduxjs/toolkit";
import { EventIdAndLocation } from "../../../types";

interface InitialState {
  eventsIdAndLocationsList: EventIdAndLocation[];
  eventToDelete: EventIdAndLocation;
}

const initialState: InitialState = {
  eventsIdAndLocationsList: [],
  eventToDelete: { id: "", location: "" },
};

const calendarEventsSlice = createSlice({
  name: "calendarEvents",
  initialState,
  reducers: {
    setEventsIdAndLocation(state, { payload: eventsList }) {
      const idAndLocationsList = eventsList.map((event: any) => {
        return { location: event.location, id: event.id };
      });
      state.eventsIdAndLocationsList = idAndLocationsList;
    },
    setAddGoogleEvent(state, { payload: eventLocation }) {
      state.eventsIdAndLocationsList.push(eventLocation);
    },
    setDeleteGoogleEvent(state, { payload: deletedEventId }) {
      state.eventsIdAndLocationsList = state.eventsIdAndLocationsList.filter(
        (eventIdAndLocation) => eventIdAndLocation.id !== deletedEventId
      );
    },
    setEventToDelete(state, { payload: eventLocation }) {
      const eventToDelete = state.eventsIdAndLocationsList.find(
        (eventIdAndLocation) => eventIdAndLocation.location === eventLocation
      );
      if (eventToDelete) {
        state.eventToDelete = eventToDelete;
      }
    },
  },
});

export const {
  setEventsIdAndLocation,
  setAddGoogleEvent,
  setDeleteGoogleEvent,
  setEventToDelete,
} = calendarEventsSlice.actions;

export default calendarEventsSlice.reducer;
