import { Button } from "@mui/material";
import { Session, useSession } from "@supabase/auth-helpers-react";
import { ITask } from "../../../../types";
import { formatDate } from "../../../../utils/helpers/formatDate";
import {
  createGoogleCalendarEvent,
  deleteGoogleCalendarEvent,
} from "../../../../Supabase/Api";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

interface Props {
  task: ITask;
}

const AddToCalendarButton = ({ task }: Props) => {
  const session = useSession(); // tokens, when session exists we have a user.

  const dispatch = useAppDispatch();
  const { eventsIdList } = useAppSelector(
    (state) => state.calendarEventsReducer
  );

  const isInCalendar = eventsIdList.find((eventId) => eventId === task._id);

  const createCalenderEvent = () => {
    const { reformattedStartTime, reformattedEndTime } = formatDate(task);
    const event = {
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

  const deleteCalendarEvent = () => {
    deleteGoogleCalendarEvent(task._id, session as Session, dispatch);
  };

  return session ? (
    isInCalendar ? (
      <Button onClick={deleteCalendarEvent}>Remove from calendar</Button>
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
