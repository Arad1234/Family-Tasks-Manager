import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import variables from "@Sass/variables.module.scss";

const ForgotPasswordText = () => {
  const navigate = useNavigate();

  return (
    <Typography
      sx={{
        color: variables.secondActionColor,
        position: "fixed",
        top: "25.3rem",
        right: "58px",
      }}
      onClick={() => navigate("/forgotPassword")}
    >
      Forgot Password
    </Typography>
  );
};

export default ForgotPasswordText;
