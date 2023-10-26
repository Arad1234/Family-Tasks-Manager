import { Typography } from "@mui/material";
import { ChildrenProps } from "@Types/index";

const InputErrorMessage = ({ children }: ChildrenProps) => {
  return (
    <Typography
      sx={{
        color: "rgb(250, 100, 50)",
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
