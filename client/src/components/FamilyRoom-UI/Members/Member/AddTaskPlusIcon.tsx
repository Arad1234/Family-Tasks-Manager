import { Box } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import { setOpenModal } from "../../../../redux/slices/Modal/modal-slice";
import { useAppDispatch } from "../../../../redux/hooks";
import { setMemberForAssignTask } from "../../../../redux/slices/FamilyRoom/members-slice";
import { IUser } from "../../../../types";

interface Props {
  member: IUser;
}

const AddTaskPlusIcon = ({ member }: Props) => {
  const disptach = useAppDispatch();

  const handleOpenModal = () => {
    disptach(setOpenModal("assignTask"));
    disptach(setMemberForAssignTask(member));
  };

  return (
    <Box
      sx={{
        display: "flex",
        background: "rgb(50, 130, 170)",
        padding: "10px",
        borderRadius: "50%",
      }}
      onClick={handleOpenModal}
    >
      <AiOutlinePlus
        color="white"
        size={20}
      />
    </Box>
  );
};

export default AddTaskPlusIcon;
