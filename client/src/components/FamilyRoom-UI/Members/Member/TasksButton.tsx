import { Button } from "@mui/material";
import { useAppDispatch } from "../../../../redux/hooks";
import { IMember } from "../../../../types";
import { setSelectedMember } from "../../../../redux/slices/FamilyRoom/members-slice";

interface Props {
  member: IMember;
}

const TasksButton = ({ member }: Props) => {
  const dispatch = useAppDispatch();
  const handleShowMemberTasks = () => {
    dispatch(setSelectedMember(member));
  };

  return (
    <Button
      variant="outlined"
      sx={{
        background: "rgba(50, 180, 130, 0.5)",
        textTransform: "none",
        border: "1px solid gray",
        padding: "3px 9px",
        fontSize: "17px",
        fontWeight: "bold",
        color: "white",
        ":hover": { background: "rgba(50, 250, 100, 0.3)" },
      }}
      onClick={handleShowMemberTasks}
    >
      Tasks
    </Button>
  );
};

export default TasksButton;
