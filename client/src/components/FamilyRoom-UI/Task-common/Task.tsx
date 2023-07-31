import { Box } from "@mui/material";
import { ITask } from "../../../types";
import TaskCreatedAt from "./TaskCreatedAt";
import TaskTimeToDo from "./TaskTimeToDo";
import GoogleCalendarManipulation from "./GoogleCalendar/GoogleCalendarManipulation";
import TaskName from "./TaskName";
import TaskDescription from "./TaskDescription";
import { useAppSelector } from "../../../redux/hooks";

interface Props {
  task: ITask;
}

const Task = ({ task }: Props) => {
  const { selectedMember } = useAppSelector((state) => state.membersReducer);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        boxShadow: "1px 4px 8px 0 rgba(0, 0, 0, 0.3)",
        borderRadius: "10px",
        padding: "10px",
        gap: "10px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TaskName taskName={task.name} />
        <TaskCreatedAt taskCreatedAt={task.createdAt} />
      </Box>

      <TaskDescription taskDescription={task.description} />
      {task.startTime && (
        <>
          <TaskTimeToDo task={task} />
          {/* Mount the "AddToCalendarButton" if the user did not clicked to show any other member tasks. */}
          {!selectedMember && <GoogleCalendarManipulation task={task} />}
        </>
      )}
    </Box>
  );
};

export default Task;
