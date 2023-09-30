import DropDownBar from "../DropDownBar";
import { Typography } from "@mui/material";

const ForgotPasswordTitle = () => {
  return (
    <DropDownBar>
      <Typography
        sx={{
          fontSize: "25px",
          textAlign: "center",
          color: "white",
          width: "75vw",
          fontWeight: "500",
        }}
      >
        Please enter your email to reset your password
      </Typography>
    </DropDownBar>
  );
};

export default ForgotPasswordTitle;
