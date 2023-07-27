import { Box, Button } from "@mui/material";

interface Props {
  isRoomCreator: boolean;
}

const TasksButton = ({ isRoomCreator }: Props) => {
  return (
    <Box
      sx={{ position: "absolute", left: isRoomCreator ? "13rem" : "17.5rem" }}
    >
      <Button variant="contained">Tasks</Button>
    </Box>
  );
};

export default TasksButton;
