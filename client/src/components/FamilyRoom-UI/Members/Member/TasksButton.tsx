import { Button } from "@mui/material";
import { useAppDispatch } from "../../../../redux/hooks";
import { IUser } from "../../../../types";
import { setMemberForTasks } from "../../../../redux/slices/FamilyRoom/members-slice";

interface Props {
  member: IUser;
}

const TasksButton = ({ member }: Props) => {
  const dispatch = useAppDispatch();

  const handleShowMemberTasks = () => {
    dispatch(setMemberForTasks(member));
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
      View tasks
    </Button>
  );
};

export default TasksButton;
