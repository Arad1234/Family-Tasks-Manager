import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../../redux/hooks";
import { extractUserFromLocalStorage } from "../../../utils/helpers/LocalStorage/extractUser";
import Task from "../Task-common/Task";
import { IMember } from "../../../types";
import AddTaskButton from "./AddTaskButton";
import { useMemo } from "react";

const AllTasks = () => {
  const { currentRoom } = useAppSelector((state) => state.roomsReducer);

  const { parsedUserId: currentUserId } = extractUserFromLocalStorage();

  const currentMember = useMemo(() => {
    return currentRoom?.familyMembers?.find((member) => {
      return member.userId === currentUserId;
    });
  }, [currentRoom]); // When familyMembers changed it means that a task is added to one of the familyMembers or something happen with the members (deleted/added), so I need to reflect the changes.

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <AddTaskButton currentMember={currentMember as IMember} />
      {currentMember?.tasks.length === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h5">Add Your First Task!</Typography>
        </Box>
      ) : (
        currentMember?.tasks.map((task) => {
          return (
            <Task
              key={task._id}
              task={task}
            />
          );
        })
      )}
    </Box>
  );
};

export default AllTasks;
