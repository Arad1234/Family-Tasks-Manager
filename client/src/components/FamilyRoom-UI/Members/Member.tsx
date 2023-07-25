import { Box, Button, Typography } from "@mui/material";
import { IMember } from "../../../types";
import { extractUserFromLocalStorage } from "../../../utils/LocalStorage/extractUser";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setShowModal } from "../../../redux/slices/Modal/modal-slice";
import AssignTaskModal from "../Modal/AssignTaskModal/AssignTaskModal";
import { useState } from "react";

interface Props {
  member: IMember;
}

const Member = ({ member }: Props) => {
  const [clickedUserId, setClickedUserId] = useState<string>("");
  const { currentRoom } = useAppSelector((state) => state.roomsReducer);
  const { modalStatus } = useAppSelector((state) => state.modalReducer);
  const disptach = useAppDispatch();

  const { parsedUserId: currentUserId } = extractUserFromLocalStorage();
  const isCreator = currentRoom.creator.userId === currentUserId;

  const handleOpenModal = () => {
    disptach(setShowModal({ isOpen: true, modalStatus: "assignTask" }));
    setClickedUserId(member.userId);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        border: "1px solid gray",
        padding: "10px",
      }}
    >
      <Typography>{member.username}</Typography>
      <Button variant="contained">View Tasks</Button>
      {isCreator && (
        <Button
          onClick={handleOpenModal}
          variant="contained"
        >
          Assign Task
        </Button>
      )}
      {modalStatus === "assignTask" && (
        <AssignTaskModal clickedUserId={clickedUserId} />
      )}
    </Box>
  );
};

export default Member;
