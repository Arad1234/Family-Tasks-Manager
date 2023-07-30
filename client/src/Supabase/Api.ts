import { Session } from "@supabase/supabase-js";
import { GoogleCalendarEventCreation } from "../types";
import { googleCalendarBaseURL } from "../utils/constants";
import { AppDispatch } from "../redux/store";
import {
  setAddGoogleEvent,
  setDeleteGoogleEvent,
  setEventsIdAndLocation,
} from "../redux/slices/CalendarEvents/CalendarEvents";
import { setShowModal } from "../redux/slices/Modal/modal-slice";

export const fetchGoogleCalendarEvents = async (
  session: Session,
  dispatch: AppDispatch
) => {
  try {
    const response = await fetch(`${googleCalendarBaseURL}/primary/events`, {
      headers: {
        Authorization: `Bearer ${session?.provider_token}`,
      },
    });
    const data = await response.json();
    console.log(data.items);
    dispatch(setEventsIdAndLocation(data.items));
  } catch (error) {
    console.log(error);
  }
};

export const createGoogleCalendarEvent = async (
  event: GoogleCalendarEventCreation,
  session: Session,
  dispatch: AppDispatch
) => {
  try {
    const response = await fetch(`${googleCalendarBaseURL}/primary/events`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.provider_token}`,
      },
      body: JSON.stringify(event),
    });
    const data = await response.json();
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data);
      dispatch(setAddGoogleEvent({ location: data.location, id: data.id }));
      alert("Created Event!");
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteGoogleCalendarEvent = async (
  eventToDeleteId: string,
  session: Session,
  dispatch: AppDispatch
) => {
  try {
    await fetch(`${googleCalendarBaseURL}/primary/events/${eventToDeleteId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${session?.provider_token}` },
    });

    dispatch(setDeleteGoogleEvent(eventToDeleteId));
    dispatch(setShowModal({ isOpen: false, modalStatus: "" }));
    alert("Deleted Event!");
  } catch (error) {
    console.log(error);
  }
};
