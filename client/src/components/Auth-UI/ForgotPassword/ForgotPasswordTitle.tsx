import { Typography } from "@mui/material";
import { DropDownBarStyled } from "../styles/dropDownBar.styled";

const ForgotPasswordTitle = () => {
  return (
    <DropDownBarStyled>
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
    </DropDownBarStyled>
  );
};

export default ForgotPasswordTitle;
