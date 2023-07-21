import { Box, Button } from "@mui/material";
import { useAppDispatch } from "../../../redux/hooks";
import { setShowModal } from "../../../redux/slices/Modal/modal-slice";
import { setRoomId } from "../../../redux/slices/Room/rooms-slice";

interface Props {
  roomId: string;
}

const JoinButton = ({ roomId }: Props) => {
  const dispatch = useAppDispatch();

  const handleOpenJoinModal = () => {
    dispatch(setShowModal({ isOpen: true, modalStatus: "join" }));

    // When the "Join" button is clicked I set the roomId to the redux store.
    dispatch(setRoomId(roomId));
  };

  return (
    <Box sx={{}}>
      <Button
        sx={{ width: "60px", fontSize: "13px" }}
        variant="contained"
        onClick={handleOpenJoinModal}
      >
        Join
      </Button>
    </Box>
  );
};

export default JoinButton;
