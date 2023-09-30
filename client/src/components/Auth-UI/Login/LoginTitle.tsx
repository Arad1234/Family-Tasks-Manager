import { Typography } from "@mui/material";
import DropDownBar from "../DropDownBar";

const LoginTitle = () => {
  return (
    <DropDownBar>
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
    </DropDownBar>
  );
};

export default LoginTitle;
