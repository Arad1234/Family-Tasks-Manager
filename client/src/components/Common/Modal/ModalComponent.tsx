import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { setHideModal } from "@Redux/slices/Modal/modal-slice";
import { ChildrenProps } from "@Types/index";
import { Box, Modal } from "@mui/material";

const ModalComponent = ({ children }: ChildrenProps) => {
  const isOpen = useAppSelector((state) => state.modalReducer.isOpen);

  const dispatch = useAppDispatch();

  const handleOnClose = () => {
    dispatch(setHideModal());
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
