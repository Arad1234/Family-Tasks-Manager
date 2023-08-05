import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setShowModal } from "../../redux/slices/Modal/modal-slice";
import { Box, Modal } from "@mui/material";
import { ChildrenProps } from "../../types";
import { resetRoomDetails } from "../../redux/slices/Rooms/createRoom-slice";
import { resetRoomPassword } from "../../redux/slices/Rooms/joinRoom-slice";

const ModalComponent = ({ children }: ChildrenProps) => {
  const { isOpen, modalStatus } = useAppSelector((state) => state.modalReducer);
  const dispatch = useAppDispatch();

  const handleOnClose = () => {
    if (modalStatus === "create") {
      dispatch(resetRoomDetails());
    } else if (modalStatus === "join") {
      dispatch(resetRoomPassword());
    }
    dispatch(setShowModal({ isOpen: false, modalStatus: "" }));
  };
  return (
    <Modal
      open={isOpen}
      onClose={handleOnClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "65vw",
          bgcolor: "background.paper",
          border: "1px solid #000",
          borderRadius: "20px",
          boxShadow: 24,
          p: 4,
          gap: "20px",
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default ModalComponent;
