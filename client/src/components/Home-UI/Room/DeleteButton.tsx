import { Button } from "@mui/material";
import { useAppDispatch } from "../../../redux/hooks";
import { setRoomId } from "../../../redux/slices/Room/rooms-slice";
import { setShowModal } from "../../../redux/slices/Modal/modal-slice";

interface Props {
  roomId: string;
}

const DeleteButton = ({ roomId }: Props) => {
  const dispatch = useAppDispatch();

  const handleDeleteRoom = () => {
    dispatch(setShowModal({ isOpen: true, modalStatus: "delete" }));
    dispatch(setRoomId(roomId));
  };
  return (
    <Button
      sx={{ width: "60px", fontSize: "13px" }}
      variant="contained"
      onClick={handleDeleteRoom}
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
