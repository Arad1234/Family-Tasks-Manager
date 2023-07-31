import { Box, Button } from "@mui/material";
import { useAppDispatch } from "../../../../redux/hooks";
import { IMember } from "../../../../types";
import { setSelectedMember } from "../../../../redux/slices/FamilyRoom/members-slice";

interface Props {
  member: IMember;
  isRoomCreator: boolean;
}

const TasksButton = ({ member, isRoomCreator }: Props) => {
  const dispatch = useAppDispatch();
  const handleShowMemberTasks = () => {
    dispatch(setSelectedMember(member));
  };

  return (
    <Box
      sx={{ position: "absolute", left: isRoomCreator ? "13rem" : "17.5rem" }}
    >
      <Button
        variant="contained"
        onClick={handleShowMemberTasks}
      >
        Tasks
      </Button>
    </Box>
  );
};

export default TasksButton;
