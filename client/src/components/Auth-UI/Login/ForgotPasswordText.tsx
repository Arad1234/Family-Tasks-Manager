import { Typography } from "@mui/material";
import variables from "../../../sass/variables.module.scss";
import { useNavigate } from "react-router-dom";

const ForgotPasswordText = () => {
  const navigate = useNavigate();
  return (
    <Typography sx={{ color: "white", marginTop: "20px" }}>
      Forgot you password?{" "}
      <Typography
        onClick={() => navigate("/forgotPassword")}
        component={"span"}
        sx={{ color: variables.actionColor }}
      >
        Click here
      </Typography>
    </Typography>
  );
};

export default ForgotPasswordText;
