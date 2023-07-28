import { Typography } from "@mui/material";

interface Props {
  taskTimeToDo: Date;
}

const TaskTimeToDo = ({ taskTimeToDo }: Props) => {
  const formattedTimeToDo = new Date(taskTimeToDo).toLocaleString("he-IL");

  return <Typography>Time To Do: {formattedTimeToDo}</Typography>;
};

export default TaskTimeToDo;
