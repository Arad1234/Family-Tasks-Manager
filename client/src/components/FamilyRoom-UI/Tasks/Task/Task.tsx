import { Box } from "@mui/material";
import { ITask } from "../../../../types";
import TaskName from "./TaskName";
import TaskDescription from "./TaskDescription";
import TaskCreatedAt from "./TaskCreatedAt";
import TaskTimeToDo from "./TaskTimeToDo";
import AddToCalendarButton from "./AddToCalendarButton";

interface Props {
  task: ITask;
}

const Task = ({ task }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px dashed gray",
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
          <AddToCalendarButton task={task} />
        </>
      )}
    </Box>
  );
};

export default Task;
