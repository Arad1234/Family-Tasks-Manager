import { Session } from "@supabase/supabase-js";
import { GoogleCalendarEventCreation } from "../types";
import { googleCalendarBaseURL } from "../utils/constants";
import { AppDispatch } from "../redux/store";
import {
  setAddGoogleEvent,
  setDeleteGoogleEvent,
  setEventsIdAndCreatedAt,
} from "../redux/slices/CalendarEvents/CalendarEvents";
import { hideModal } from "../utils/helpers/hideModal";
import { toast } from "react-toastify";

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
    console.log(data);
    dispatch(setEventsIdAndCreatedAt(data.items));
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
      const newEvent = data;

      const { extendedProperties } = newEvent;

      dispatch(
        setAddGoogleEvent({
          taskCreatedAt: extendedProperties.private.taskCreatedAt,
          id: newEvent.id,
        })
      );
      toast.success("Google Event Created!");
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
    hideModal(dispatch);
    toast.success("Event Deleted!");
  } catch (error) {
    console.log(error);
  }
};
