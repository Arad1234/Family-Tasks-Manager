import { Typography } from "@mui/material";
import { DropDownBarStyled } from "../DropDownBar/DropDownBar.styled";

const RegisterTitle = () => {
  return (
    <DropDownBarStyled>
      <Typography
        sx={{
          fontSize: "25px",
          padding: "0 ",
          textAlign: "center",
          fontWeight: "500",
        }}
      >
        Welcome To The
        <Typography
          sx={{
            display: "block",
            fontSize: "29px",
            fontWeight: "600",
          }}
          component={"span"}
        >
          Family Tasks Manager
        </Typography>
      </Typography>
    </DropDownBarStyled>
  );
};

export default RegisterTitle;
