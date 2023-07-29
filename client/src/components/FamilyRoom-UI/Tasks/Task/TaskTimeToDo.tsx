import { Typography } from "@mui/material";
import { ITask } from "../../../../types";

interface Props {
  task: ITask;
}

const TaskTimeToDo = ({ task }: Props) => {
  const formattedStartTime = new Date(task.startTime as Date).toLocaleString(
    "he-IL",
    { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }
  );
  const formattedEndTime = new Date(task.endTime as Date).toLocaleString(
    "he-IL",
    { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }
  );

  return (
    <>
      <Typography>Start Time: {formattedStartTime}</Typography>
      <Typography>End Time: {formattedEndTime}</Typography>
    </>
  );
};

export default TaskTimeToDo;
