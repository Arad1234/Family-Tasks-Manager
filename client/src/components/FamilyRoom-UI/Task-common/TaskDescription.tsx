import { Typography } from "@mui/material";

interface Props {
  taskDescription: string;
}

const TaskDescription = ({ taskDescription }: Props) => {
  return (
    <Typography sx={{ wordWrap: "break-word" }}>{taskDescription}</Typography>
  );
};

export default TaskDescription;
