import { Typography } from "@mui/material";
import DropDownBar from "../DropDownBar";

const RegisterTitle = () => {
  return (
    <DropDownBar>
      <Typography
        sx={{
          fontSize: "25px",
          padding: "0 ",
          textAlign: "center",
          fontWeight: "500",
          color: "white",
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
    </DropDownBar>
  );
};

export default RegisterTitle;
