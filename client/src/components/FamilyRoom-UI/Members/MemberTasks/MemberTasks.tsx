import { useAppSelector } from "../../../../redux/hooks";
import { Box, Typography } from "@mui/material";
import Task from "../../Task-common/Task";
import Header from "./Header";

const MemberTasks = () => {
  const { selectedMember } = useAppSelector((state) => state.membersReducer);

  return (
    <Box>
      <Header />
      {selectedMember?.tasks.length === 0 ? (
        <Typography variant="h4">No tasks (yet...)</Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {selectedMember?.tasks.map((task) => {
            return (
              <Task
                key={task._id}
                task={task}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default MemberTasks;
