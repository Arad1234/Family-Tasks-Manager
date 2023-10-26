import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ForgotPasswordText = () => {
  const navigate = useNavigate();

  return (
    <Typography
      sx={{
        color: "#4d9fff",
        position: "fixed",
        top: "24.5rem",
        right: "75px",
      }}
      onClick={() => navigate("/forgotPassword")}
    >
      Forgot Password
    </Typography>
  );
};

export default ForgotPasswordText;
