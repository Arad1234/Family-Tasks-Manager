import { createSlice } from "@reduxjs/toolkit";
import { EventIdAndCreatedAt } from "@Types/index";

interface InitialState {
  eventsIdAndCreatedAtList: EventIdAndCreatedAt[];
  eventToDelete: EventIdAndCreatedAt | null;
}

const initialState: InitialState = {
  eventsIdAndCreatedAtList: [],
  eventToDelete: null,
};

const calendarEventsSlice = createSlice({
  name: "calendarEvents",
  initialState,
  reducers: {
    setEventsIdAndCreatedAt(state, { payload: eventsList }) {
      const idAndCreatedAtList = eventsList.map((event: any) => {
        const { extendedProperties } = event;

        if (extendedProperties && extendedProperties.private) {
          return {
            taskCreatedAt: extendedProperties.private.taskCreatedAt,
            id: event.id,
          };
        } else {
          return { id: event.id };
        }
      });

      state.eventsIdAndCreatedAtList = idAndCreatedAtList;
    },
    setAddGoogleEvent(state, { payload: newEvent }) {
      const { taskCreatedAt, id } = newEvent;
      state.eventsIdAndCreatedAtList.push({ taskCreatedAt, id });
    },
    setDeleteGoogleEvent(state, { payload: deletedEventId }) {
      state.eventsIdAndCreatedAtList = state.eventsIdAndCreatedAtList.filter(
        (eventIdAndCreatedAt) => eventIdAndCreatedAt.id !== deletedEventId
      );
    },
    setEventToDelete(state, { payload: eventCreatedAt }) {
      const eventToDelete = state.eventsIdAndCreatedAtList.find(
        (eventIdAndCreatedAt) =>
          eventIdAndCreatedAt.taskCreatedAt === eventCreatedAt
      );
      if (eventToDelete) {
        state.eventToDelete = eventToDelete;
      }
    },
  },
});

export const {
  setEventsIdAndCreatedAt,
  setAddGoogleEvent,
  setDeleteGoogleEvent,
  setEventToDelete,
} = calendarEventsSlice.actions;

export default calendarEventsSlice.reducer;
