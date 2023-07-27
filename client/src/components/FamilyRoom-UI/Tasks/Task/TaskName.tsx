import { Typography } from "@mui/material";

interface Props {
  taskName: string;
}

const TaskName = ({ taskName }: Props) => {
  return (
    <Typography
      sx={{
        fontSize: "18px",
        fontWeight: "600",
      }}
    >
      {taskName}
    </Typography>
  );
};

export default TaskName;
