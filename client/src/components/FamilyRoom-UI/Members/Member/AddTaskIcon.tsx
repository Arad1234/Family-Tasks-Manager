import { Box } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import { setShowModal } from "../../../../redux/slices/Modal/modal-slice";
import React from "react";
import { useAppDispatch } from "../../../../redux/hooks";

interface Props {
  setClickedUserId: React.Dispatch<React.SetStateAction<string>>;
  memberId: string;
}
const AddTaskPlusIcon = ({ setClickedUserId, memberId }: Props) => {
  const disptach = useAppDispatch();

  const handleOpenModal = () => {
    disptach(setShowModal({ isOpen: true, modalStatus: "assignTask" }));
    setClickedUserId(memberId);
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
