import { createRoomThunk } from "../../../store/actions/Room/rooms-actions";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { resetRoom } from "../../../store/slices/Room/create-room";
import { setIsOpen } from "../../../store/slices/Modal/modal-slice";
import "./CreateRoomModal.scss";
import { Box, Typography, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ModalButton from "./ModalButton";
import ModalInputs from "./ModalInputs";

const CreateRoomModal = () => {
  const { isOpen } = useAppSelector((state) => state.modalReducer);
  const { maxMembers, roomName } = useAppSelector(
    (state) => state.createRoomReducer
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCreateRoom = async () => {
    const response = await dispatch(createRoomThunk({ roomName, maxMembers }));
    if (response.error) {
      if (response.payload === "Unauthorized!") {
        navigate("/");
      }
      alert(response.payload);
    }

    dispatch(resetRoom());
  };
  return (
    <Modal
      open={isOpen}
      onClose={() => dispatch(setIsOpen(false))}
      className="create-room-modal"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "70vw",
          bgcolor: "background.paper",
          border: "1px solid #000",
          borderRadius: "20px",
          boxShadow: 24,
          p: 4,
          gap: "20px",
        }}
      >
        <Typography
          sx={{
            fontSize: "25px",
            textDecoration: "underline",
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          Room Creation
        </Typography>

        <ModalInputs />
        <ModalButton handleCreateRoom={handleCreateRoom} />
      </Box>
    </Modal>
  );
};

export default CreateRoomModal;
