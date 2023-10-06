import { Session } from "@supabase/supabase-js";
import { GoogleCalendarEventCreation } from "../types";
import { googleCalendarBaseURL } from "../utils/constants";
import { AppDispatch } from "../redux/store";
import {
  setAddGoogleEvent,
  setDeleteGoogleEvent,
  setEventsIdAndCreatedAt,
} from "../redux/slices/CalendarEvents/CalendarEvents";
import { toast } from "react-toastify";
import { setHideModal } from "../redux/slices/Modal/modal-slice";

export const fetchGoogleCalendarEvents = async (
  session: Session,
  dispatch: AppDispatch
) => {
  try {
    const response = await fetch(`${googleCalendarBaseURL}/events`, {
      headers: {
        Authorization: `Bearer ${session?.provider_token}`,
      },
    });
    const data = await response.json();

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
    const response = await fetch(`${googleCalendarBaseURL}/events`, {
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
    await fetch(`${googleCalendarBaseURL}/events/${eventToDeleteId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${session?.provider_token}` },
    });

    dispatch(setDeleteGoogleEvent(eventToDeleteId));
    dispatch(setHideModal());
    toast.success("Event Deleted!");
  } catch (error) {
    console.log(error);
  }
};
