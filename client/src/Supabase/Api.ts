import { Session } from "@supabase/supabase-js";
import { GoogleCalendarEventCreation } from "../types";
import { googleCalendarBaseURL } from "../utils/constants";
import { AppDispatch } from "../redux/store";
import {
  setAddGoogleEvent,
  setDeleteGoogleEvent,
  setEventsId,
} from "../redux/slices/CalendarEvents/CalendarEvents";

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
    console.log(data);
    dispatch(setEventsId(data.items));
  } catch (error: any) {
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
      dispatch(setAddGoogleEvent(data.id));
    }
  } catch (error: any) {
    console.log(error);
  }
};

export const deleteGoogleCalendarEvent = async (
  taskId: string,
  session: Session,
  dispatch: AppDispatch
) => {
  try {
    const response = await fetch(
      `${googleCalendarBaseURL}/primary/events/${taskId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session?.provider_token}` },
      }
    );

    const data = await response.json();

    dispatch(setDeleteGoogleEvent(data.id));
  } catch (error) {
    console.log(error);
  }
};
