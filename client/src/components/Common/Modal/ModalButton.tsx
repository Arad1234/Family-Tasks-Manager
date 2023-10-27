import { Button, ButtonProps } from "@mui/material";

type Props = {
  children: React.ReactNode;
} & ButtonProps;

const ModalButton = ({ children, ...props }: Props) => (
  <Button
    {...props}
    type="submit"
    variant="contained"
    sx={{
      fontSize: "20px",
      fontFamily: "system-ui",
      marginTop: "8px",
    }}
  >
    {children}
  </Button>
);

export default ModalButton;
