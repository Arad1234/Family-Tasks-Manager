import { Box } from "@mui/material";
import { useAppSelector } from "../../../redux/hooks";
import { extractUserFromLocalStorage } from "../../../utils/LocalStorage/extractUser";

const Tasks = () => {
  const { currentRoom } = useAppSelector((state) => state.roomsReducer);
  const { familyMembers } = currentRoom;

  const { parsedUserId: currentUserId } = extractUserFromLocalStorage();

  const currentMember = familyMembers.find((member) => {
    return member.userId === currentUserId;
  });
  return (
    <Box>
      {currentMember?.tasks.map((task) => {
        return <Box key={task._id}>{task.name}</Box>;
      })}
    </Box>
  );
};

export default Tasks;
