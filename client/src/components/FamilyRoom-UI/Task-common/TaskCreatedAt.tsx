import { Typography } from "@mui/material";

interface Props {
  taskCreatedAt: string;
}

const TaskCreatedAt = ({ taskCreatedAt }: Props) => {
  const formattedCreatedAt = new Date(taskCreatedAt).toLocaleString("he-IL", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return <Typography>{formattedCreatedAt}</Typography>;
};

export default TaskCreatedAt;
