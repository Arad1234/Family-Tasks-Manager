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
        borderRadius: "25px",
        backgroundColor: "rgb(50, 200, 100)",
        ":hover": { backgroundColor: "rgba(50, 200, 100, 0.8)" },
      }}
      variant="contained"
      onClick={handleOpenCreateModal}
    >
      New Room
    </Button>
  );
};

export default NewRoomButton;
