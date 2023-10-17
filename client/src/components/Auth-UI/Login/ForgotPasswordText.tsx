import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ForgotPasswordText = () => {
  const navigate = useNavigate();

  return (
    <Typography
      sx={{
        position: "fixed",
        color: "#4d9fff",
        top: "24.2rem",
        right: "75px",
      }}
      onClick={() => navigate("/forgotPassword")}
    >
      Forgot Password
    </Typography>
  );
};

export default ForgotPasswordText;
