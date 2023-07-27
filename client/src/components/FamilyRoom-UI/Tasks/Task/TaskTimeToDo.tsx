import { Typography } from "@mui/material";

interface Props {
  TaskTimeToDo: Date;
}

const TaskTimeToDo = ({ TaskTimeToDo }: Props) => {
  const formattedTimeToDo = new Date(TaskTimeToDo).toLocaleString("he-IL");

  return <Typography>Time To Do: {formattedTimeToDo}</Typography>;
};

export default TaskTimeToDo;
