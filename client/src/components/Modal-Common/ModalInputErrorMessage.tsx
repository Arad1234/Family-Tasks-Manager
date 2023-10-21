import { ChildrenProps } from "@Types/index";
import { Typography } from "@mui/material";

const ModalInputErrorMessage = ({ children }: ChildrenProps) => {
  return (
    <Typography
      sx={{
        color: "red",
        position: "absolute",
        top: "58px",
        left: "2px",
      }}
    >
      {children}
    </Typography>
  );
};

export default ModalInputErrorMessage;
