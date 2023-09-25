import { Button, ButtonProps } from "@mui/material";

type Props = {
  children: React.ReactNode;
} & ButtonProps;

const ModalButton = ({ children, ...props }: Props) => (
  <Button
    {...props}
    sx={{ fontSize: "20px", fontFamily: "system-ui" }}
    variant="contained"
  >
    {children}
  </Button>
);

export default ModalButton;
