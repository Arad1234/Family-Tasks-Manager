import { useAppSelector } from "../../../../redux/hooks";
import { Box, Typography } from "@mui/material";
import Task from "../../Task-common/Task";
import Header from "./Header";

const MemberTasks = () => {
  const { memberForTasks } = useAppSelector((state) => state.membersReducer);

  return (
    <Box>
      <Header />
      {memberForTasks?.tasks.length === 0 ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", margin: "30px " }}
        >
          <Typography variant="h4">No tasks (yet...)</Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {memberForTasks?.tasks.map((task) => {
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
