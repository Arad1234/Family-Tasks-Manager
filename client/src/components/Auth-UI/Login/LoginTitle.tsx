import { Typography } from "@mui/material";
import { DropDownBarStyled } from "../styles/dropDownBar.styled";

const LoginTitle = () => {
  return (
    <DropDownBarStyled>
      <Typography
        sx={{ fontSize: "25px", color: "white", textAlign: "center" }}
      >
        Welcome back!
        <Typography
          sx={{
            fontSize: "30px",
            color: "white",
            fontWeight: "600",
            display: "block",
          }}
          component={"span"}
        >
          Let's Sign you in
        </Typography>
      </Typography>
    </DropDownBarStyled>
  );
};

export default LoginTitle;
