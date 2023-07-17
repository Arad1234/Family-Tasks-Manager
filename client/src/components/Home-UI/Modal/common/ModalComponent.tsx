import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setIsOpen } from "../../../../redux/slices/Modal/modal-slice";
import { Box, Modal } from "@mui/material";
import { ChildrenProps } from "../../../../types";

const ModalComponent = ({ children }: ChildrenProps) => {
  const { isOpen } = useAppSelector((state) => state.modalReducer);
  const dispatch = useAppDispatch();

  return (
    <Modal
      open={isOpen}
      onClose={() => dispatch(setIsOpen({ isOpen: false, status: "" }))}
      sx={{
        display: "flex",
        justifyContent: " center",
        alignItems: "center",
        height: "100vh",
      }}
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
        {children}
      </Box>
    </Modal>
  );
};

export default ModalComponent;
