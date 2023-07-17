import { Button } from "@mui/material";

interface Props {
  handleClick: () => void;
  children: React.ReactNode;
}

const ModalButton = ({ handleClick, children }: Props) => (
  <Button
    onClick={handleClick}
    sx={{ fontSize: "20px", fontFamily: "system-ui" }}
    variant="contained"
  >
    {children}
  </Button>
);

export default ModalButton;
