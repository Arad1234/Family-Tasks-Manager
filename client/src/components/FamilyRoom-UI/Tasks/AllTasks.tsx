import { Box } from "@mui/material";
import { useAppSelector } from "../../../redux/hooks";
import { extractUserFromLocalStorage } from "../../../utils/helpers/LocalStorage/extractUser";
import Task from "../Task-common/Task";
import { IRoom } from "../../../types";

const AllTasks = () => {
  const { currentRoom } = useAppSelector((state) => state.roomsReducer);
  const { familyMembers } = currentRoom as IRoom;

  const { parsedUserId: currentUserId } = extractUserFromLocalStorage();

  const currentMember = familyMembers?.find((member) => {
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
