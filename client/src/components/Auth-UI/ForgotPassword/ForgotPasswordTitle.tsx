import { Typography } from "@mui/material";
import { DropDownBarStyled } from "../DropDownBar/DropDownBar.styled";

const ForgotPasswordTitle = () => {
  return (
    <DropDownBarStyled>
      <Typography
        sx={{
          fontSize: "25px",
          textAlign: "center",
          width: "75vw",
          fontWeight: "500",
        }}
      >
        Please enter your email to reset your password
      </Typography>
    </DropDownBarStyled>
  );
};

export default ForgotPasswordTitle;
