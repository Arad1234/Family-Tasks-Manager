import { Box, Button, Typography } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch } from "../../../redux/hooks";
import { setMemberForAssignTask } from "../../../redux/slices/FamilyRoom/members-slice";
import { IUser } from "../../../types";
import { setOpenModal } from "../../../redux/slices/Modal/modal-slice";

interface Props {
  currentMember: IUser;
}

const AddTaskButton = ({ currentMember }: Props) => {
  const dispatch = useAppDispatch();

  const handleOpenAssignTaskModal = () => {
    dispatch(setMemberForAssignTask(currentMember));
    dispatch(setOpenModal("assignTask"));
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        variant="outlined"
        sx={{
          width: "9.5em",
          padding: "0",
          background: "rgba(0, 130, 120, 0.7)",
          color: "white",
          textTransform: "none",
          fontWeight: "600",
          fontSize: "16px",
          ":hover": { background: "rgba(0, 130, 120, 0.5)" },
        }}
        onClick={handleOpenAssignTaskModal}
      >
        <Box
          sx={{
            width: "120px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography>Add Task</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "45px",
            width: "65px",
            background: "rgba(0, 130, 120, 0.5)",
          }}
        >
          <AiOutlinePlus size={25} />
        </Box>
      </Button>
    </Box>
  );
};

export default AddTaskButton;
