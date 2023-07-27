import { Typography } from "@mui/material";

interface Props {
  TaskDescription: string;
}

const TaskDescription = ({ TaskDescription }: Props) => {
  return (
    <Typography sx={{ wordWrap: "break-word" }}>{TaskDescription}</Typography>
  );
};

export default TaskDescription;
