import { Box, Button } from "@mui/material";
import { useAppDispatch } from "../../../redux/hooks";
import { setIsOpen } from "../../../redux/slices/Modal/modal-slice";

const JoinButton = () => {
  const dispatch = useAppDispatch();

  const handleJoinRoom = () => {
    dispatch(setIsOpen({ isOpen: true, status: "join" }));
  };
  return (
    <Box sx={{}}>
      <Button
        sx={{ width: "120px", fontSize: "13px" }}
        variant="contained"
        onClick={handleJoinRoom}
      >
        Join Room
      </Button>
    </Box>
  );
};

export default JoinButton;
