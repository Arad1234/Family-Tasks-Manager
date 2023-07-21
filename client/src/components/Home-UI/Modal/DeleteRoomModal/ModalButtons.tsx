import { Box, Button } from "@mui/material";

interface Props {
  handleDeleteRoom: () => void;
  handleCancel: () => void;
}

const ModalButtons = ({ handleDeleteRoom, handleCancel }: Props) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
      <Button
        sx={{ width: "40%" }}
        variant="contained"
        onClick={handleDeleteRoom}
      >
        Yes
      </Button>
      <Button
        sx={{ width: "40%" }}
        variant="contained"
        onClick={handleCancel}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default ModalButtons;
