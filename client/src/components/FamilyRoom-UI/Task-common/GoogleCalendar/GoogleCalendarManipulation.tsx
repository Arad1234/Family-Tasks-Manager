import { useSession } from "@supabase/auth-helpers-react";
import { ITask } from "../../../../types";
import { formatDate } from "../../../../utils/helpers/formatDate";
import { createGoogleCalendarEvent } from "../../../../Supabase/Api";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setEventToDelete } from "../../../../redux/slices/CalendarEvents/CalendarEvents";
import { setShowModal } from "../../../../redux/slices/Modal/modal-slice";
import GoogleCalendarButton from "./Button";
import { useMemo } from "react";

interface Props {
  task: ITask;
}

const GoogleCalendarManipulation = ({ task }: Props) => {
  const session = useSession(); // tokens, when session exists we have a user.

  const dispatch = useAppDispatch();
  const { eventsIdAndLocationsList } = useAppSelector(
    (state) => state.calendarEventsReducer
  );

  const isInCalendar = useMemo(() => {
    return eventsIdAndLocationsList.find(
      (eventIdAndLocation) => eventIdAndLocation.location === task.createdAt
    );
  }, [eventsIdAndLocationsList]);

  const createCalenderEvent = () => {
    const { reformattedStartTime, reformattedEndTime } = formatDate(task);

    const event = {
      // I'm setting the location of the event as the "createdAt" property of the task to identify the task later when want to delete her from the calendar.
      location: task.createdAt,
      summary: task.name,
      description: task.description,
      start: {
        dateTime: reformattedStartTime,
      },
      end: {
        dateTime: reformattedEndTime,
      },
    };
    if (session) {
      createGoogleCalendarEvent(event, session, dispatch);
    }
  };

  const showDeleteEventModal = () => {
    dispatch(setEventToDelete(task.createdAt));
    dispatch(
      setShowModal({ isOpen: true, modalStatus: "deleteCalendarEvent" })
    );
  };

  return session ? (
    isInCalendar ? (
      <GoogleCalendarButton
        background="150, 20, 60"
        handleClick={showDeleteEventModal}
      >
        Delete From Calendar
      </GoogleCalendarButton>
    ) : (
      <GoogleCalendarButton
        background="20, 60, 150"
        handleClick={createCalenderEvent}
      >
        Add To Google Calender
      </GoogleCalendarButton>
    )
  ) : null;
};

export default GoogleCalendarManipulation;
