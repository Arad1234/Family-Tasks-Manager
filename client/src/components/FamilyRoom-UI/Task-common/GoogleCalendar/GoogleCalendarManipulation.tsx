import { useSession } from "@supabase/auth-helpers-react";
import GoogleCalendarButton from "./Button";
import { useMemo } from "react";
import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { ITask } from "@Types/index";
import { formatDate } from "@Utils/helpers/formatDate";
import { createGoogleCalendarEvent } from "@Supabase/Api";
import { setEventToDelete } from "@Redux/slices/CalendarEvents/CalendarEvents";
import { setOpenModal } from "@Redux/slices/Modal/modal-slice";
import { DELETE_CALENDAR_EVENT_MODAL } from "@Utils/constants/modalStatusConstants";

interface Props {
  task: ITask;
}

const GoogleCalendarManipulation = ({ task }: Props) => {
  const session = useSession(); // tokens, when session exists we have a user.

  const dispatch = useAppDispatch();
  const { eventsIdAndCreatedAtList } = useAppSelector(
    (state) => state.calendarEventsReducer
  );

  const isInCalendar = useMemo(() => {
    return eventsIdAndCreatedAtList.some(
      (eventIdAndCreatedAt) =>
        eventIdAndCreatedAt.taskCreatedAt === task.createdAt
    );
  }, [eventsIdAndCreatedAtList]);

  const createCalenderEvent = () => {
    const { reformattedStartTime, reformattedEndTime } = formatDate(task);

    const event = {
      // I'm setting the extendedProperties of the event as the "taskCreatedAt" property of the task to identify the task later when want to delete her from the calendar and update the redux state accordingly.
      extendedProperties: { private: { taskCreatedAt: task.createdAt } },
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
    dispatch(setOpenModal(DELETE_CALENDAR_EVENT_MODAL));
  };

  return session?.provider_token ? (
    isInCalendar ? (
      <GoogleCalendarButton
        backgroundColor="150, 20, 60"
        handleClick={showDeleteEventModal}
      >
        Delete From Calendar
      </GoogleCalendarButton>
    ) : (
      <GoogleCalendarButton
        backgroundColor="20, 60, 150"
        handleClick={createCalenderEvent}
      >
        Add To Google Calender
      </GoogleCalendarButton>
    )
  ) : (
    <Typography>Google Authentication Expires, Please Log In again</Typography>
  );
};

export default GoogleCalendarManipulation;
