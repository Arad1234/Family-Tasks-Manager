import { Typography } from "@mui/material";
import { ChildrenProps } from "../../../types";

const SendEmailMessage = ({ children }: ChildrenProps) => {
  return (
    <Typography
      sx={{
        textAlign: "center",
        color: "white",
        fontSize: "20px",
        lineHeight: "2rem",
        width: "90%",
        wordWrap: "break-word",
      }}
    >
      {children}
    </Typography>
  );
};

export default SendEmailMessage;
