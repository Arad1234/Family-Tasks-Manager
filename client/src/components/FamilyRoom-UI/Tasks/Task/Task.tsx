import { Box, Typography } from "@mui/material";
import { ITask } from "../../../../types";

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
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          {task.name}
        </Typography>
        <Typography>{task.timeToDo?.toString()}</Typography>
      </Box>
      <Typography sx={{ wordWrap: "break-word" }}>
        {task.description}
      </Typography>
    </Box>
  );
};

export default Task;
