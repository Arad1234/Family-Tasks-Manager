import { Button } from "@mui/material";
import { useAppDispatch } from "../../../redux/hooks";
import { setShowModal } from "../../../redux/slices/Modal/modal-slice";

const NewRoomButton = () => {
  const dispatch = useAppDispatch();
  const handleOpenCreateModal = () => {
    dispatch(setShowModal({ isOpen: true, modalStatus: "create" }));
  };

  return (
    <Button
      sx={{
        width: "120px",
        borderRadius: "20px",
        fontSize: "16px",
        backgroundColor: "rgba(0, 100, 150, 0.9)",
        textTransform: "none",
        ":hover": { backgroundColor: "rgba(0, 100, 150, 0.7)" },
      }}
      variant="contained"
      onClick={handleOpenCreateModal}
    >
      New Room
    </Button>
  );
};

export default NewRoomButton;
