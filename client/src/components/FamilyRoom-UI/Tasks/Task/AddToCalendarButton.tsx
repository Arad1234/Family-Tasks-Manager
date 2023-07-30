import { Button } from "@mui/material";
import { Session, useSession } from "@supabase/auth-helpers-react";
import { ITask } from "../../../../types";
import { formatDate } from "../../../../utils/helpers/formatDate";
import { createGoogleCalendarEvent } from "../../../../Supabase/Api";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setEventToDelete } from "../../../../redux/slices/CalendarEvents/CalendarEvents";
import { setShowModal } from "../../../../redux/slices/Modal/modal-slice";

interface Props {
  task: ITask;
}

const AddToCalendarButton = ({ task }: Props) => {
  const session = useSession(); // tokens, when session exists we have a user.

  const dispatch = useAppDispatch();
  const { eventsIdAndLocationsList } = useAppSelector(
    (state) => state.calendarEventsReducer
  );

  const isInCalendar = eventsIdAndLocationsList.find(
    (eventIdAndLocation) => eventIdAndLocation.location === task.createdAt
  );

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

    createGoogleCalendarEvent(event, session as Session, dispatch);
  };

  const showDeleteEventModal = () => {
    dispatch(setEventToDelete(task.createdAt));
    dispatch(
      setShowModal({ isOpen: true, modalStatus: "deleteCalendarEvent" })
    );
  };

  return session ? (
    isInCalendar ? (
      <Button onClick={showDeleteEventModal}>Delete from calendar</Button>
    ) : (
      <Button
        variant="outlined"
        onClick={createCalenderEvent}
      >
        Add To Google Calender
      </Button>
    )
  ) : null;
};

export default AddToCalendarButton;
