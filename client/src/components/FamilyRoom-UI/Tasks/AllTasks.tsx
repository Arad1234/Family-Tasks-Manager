import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../../redux/hooks";
import { extractUserFromLocalStorage } from "../../../utils/LocalStorage/extractUser";
import Task from "./Task/Task";

const AllTasks = () => {
  const { currentRoom } = useAppSelector((state) => state.roomsReducer);
  const { familyMembers } = currentRoom;

  const { parsedUserId: currentUserId } = extractUserFromLocalStorage();

  const currentMember = familyMembers.find((member) => {
    return member.userId === currentUserId;
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {currentMember?.tasks.map((task) => {
        return (
          <Task
            key={task._id}
            task={task}
          />
        );
      })}
    </Box>
  );
};

export default AllTasks;
