import { Button } from "@mui/material";
import { useAppDispatch } from "../../../redux/hooks";
import { setShowModal } from "../../../redux/slices/Modal/modal-slice";

const CreateButton = () => {
  const dispatch = useAppDispatch();
  const handleCreateRoom = () => {
    dispatch(setShowModal({ isOpen: true, modalStatus: "create" }));
  };

  return (
    <Button
      sx={{ width: "140px" }}
      variant="contained"
      onClick={handleCreateRoom}
    >
      Create Room
    </Button>
  );
};

export default CreateButton;
