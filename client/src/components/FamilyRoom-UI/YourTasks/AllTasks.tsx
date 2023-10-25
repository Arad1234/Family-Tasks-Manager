import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../../redux/hooks";
import Task from "../Task-common/Task";
import { IRoom, IUser } from "../../../types";
import AddTaskButton from "./AddTaskButton";
import { useMemo } from "react";

const AllTasks = () => {
  const familyRoom = useAppSelector(
    (state) => state.familyRoomReducer.familyRoom as IRoom
  );
  const userId = useAppSelector((state) => state.authReducer.userId);

  const currentMember = useMemo(() => {
    return familyRoom.familyMembers.find((member) => {
      return member.userId === userId;
    });
  }, [familyRoom.familyMembers]); // When familyMembers changed it means that a task is added to one of the familyMembers or something happen with the members (deleted/added), so I need to reflect the changes.

  const currentMemberAsTypeUser = currentMember as IUser;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <AddTaskButton currentMember={currentMemberAsTypeUser} />
      {currentMemberAsTypeUser.tasks.length === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h5">Add Your First Task!</Typography>
        </Box>
      ) : (
        currentMemberAsTypeUser.tasks.map((task) => {
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
