import { Button } from "@mui/material";
import { useSession } from "@supabase/auth-helpers-react";
import { ITask } from "../../../../types";

interface Props {
  task: ITask;
}

const AddToCalendarButton = ({ task }: Props) => {
  const session = useSession(); // tokens, when session exists we have a user.

  const createCalenderEvent = () => {
    const event = {
      summary: task.name,
      description: task.description,
      start: {
        dateTime: task.timeToDo
          ? new Date(task.timeToDo).toISOString()
          : new Date().toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: task.timeToDo
          ? new Date(task.timeToDo).toISOString()
          : new Date().toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };
    fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.provider_token}`,
      },
      body: JSON.stringify(event),
    })
      .then((data) => data.json())
      .then((jsonData) => {
        console.log(jsonData);
        alert("Event created!");
      });
  };

  return session ? (
    <Button onClick={createCalenderEvent}>Add Task to calender</Button>
  ) : null;
};

export default AddToCalendarButton;
