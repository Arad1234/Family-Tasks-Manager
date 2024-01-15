import { Typography } from "@mui/material";
import { DropDownBarStyled } from "../DropDownBar/DropDownBar.styled";

const LoginTitle = () => {
  return (
    <DropDownBarStyled>
      <Typography sx={{ fontSize: "25px", textAlign: "center" }}>
        Welcome back!
        <Typography
          sx={{
            fontSize: "30px",
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
