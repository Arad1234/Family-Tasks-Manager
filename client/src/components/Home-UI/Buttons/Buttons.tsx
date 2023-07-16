import { Box, Button } from "@mui/material";
import { useAppDispatch } from "../../../store/hooks";
import { setIsOpen } from "../../../store/slices/Modal/modal-slice";

const Buttons = () => {
  const dispatch = useAppDispatch();
  const handleCreateRoom = async () => {
    dispatch(setIsOpen(true));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "20px",
      }}
    >
      <Button
        variant="contained"
        onClick={handleCreateRoom}
      >
        Create Room
      </Button>
      <Button
        variant="contained"
        onClick={handleCreateRoom}
      >
        Join Room
      </Button>
    </Box>
  );
};

export default Buttons;
