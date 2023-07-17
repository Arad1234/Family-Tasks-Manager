import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setIsOpen } from "../../../../redux/slices/Modal/modal-slice";
import { Modal } from "@mui/material";
import ModalBox from "./ModalBox";
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
      <ModalBox>{children}</ModalBox>
    </Modal>
  );
};

export default ModalComponent;
