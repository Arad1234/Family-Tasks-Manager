import { Typography } from "@mui/material";
import { ChildrenProps } from "../../types";

const InputErrorMessage = ({ children }: ChildrenProps) => {
  return (
    <Typography
      sx={{
        color: "red",
        position: "absolute",
        top: "55px",
        left: "36px",
      }}
    >
      {children}
    </Typography>
  );
};

export default InputErrorMessage;
