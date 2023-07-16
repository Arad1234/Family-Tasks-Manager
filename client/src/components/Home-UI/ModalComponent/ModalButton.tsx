import { Button } from "@mui/material";

interface Props {
  handleCreateRoom: () => void;
}

const ModalButton = ({ handleCreateRoom }: Props) => (
  <Button
    onClick={handleCreateRoom}
    sx={{ fontSize: "20px", fontFamily: "system-ui" }}
    variant="contained"
  >
    Create
  </Button>
);

export default ModalButton;
