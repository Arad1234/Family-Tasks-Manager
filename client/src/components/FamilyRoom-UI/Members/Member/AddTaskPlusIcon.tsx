import { Box } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import { setShowModal } from "../../../../redux/slices/Modal/modal-slice";
import { useAppDispatch } from "../../../../redux/hooks";

const AddTaskPlusIcon = () => {
  const disptach = useAppDispatch();

  const handleOpenModal = () => {
    disptach(setShowModal({ isOpen: true, modalStatus: "assignTask" }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        background: "rgb(50, 100, 170)",
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
