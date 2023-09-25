import { Button } from "@mui/material";
import { useAppDispatch } from "../../../redux/hooks";
import { setShowModal } from "../../../redux/slices/Modal/modal-slice";
import variables from "../../../sass/variables.module.scss";

const NewRoomButton = () => {
  const dispatch = useAppDispatch();
  const handleOpenCreateModal = () => {
    dispatch(setShowModal({ isOpen: true, modalStatus: "create" }));
  };

  return (
    <Button
      sx={{
        width: "7.5rem",
        borderRadius: "20px",
        fontSize: "16px",
        backgroundColor: variables.actionColor,
        textTransform: "none",
        ":hover": { backgroundColor: variables.actionColor },
      }}
      variant="contained"
      onClick={handleOpenCreateModal}
    >
      New Room
    </Button>
  );
};

export default NewRoomButton;
