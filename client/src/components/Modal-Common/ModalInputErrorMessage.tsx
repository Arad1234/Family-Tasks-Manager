import { Typography } from "@mui/material";
import { ChildrenProps } from "../../types";

const ModalInputErrorMessage = ({ children }: ChildrenProps) => {
  return (
    <Typography
      sx={{
        color: "red",
        position: "absolute",
        top: "58px",
        left: "2px"
      }}
    >
      {children}
    </Typography>
  );
};

export default ModalInputErrorMessage;
