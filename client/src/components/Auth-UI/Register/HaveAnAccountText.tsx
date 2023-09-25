import { Typography } from "@mui/material";
import variables from "../../../sass/variables.module.scss";
import { useNavigate } from "react-router-dom";

const HaveAnAccountText = () => {
  const navigate = useNavigate();

  return (
    <Typography sx={{ color: "white" }}>
      Already have an account?{" "}
      <Typography
        onClick={() => navigate("/")}
        sx={{ color: variables.actionColor, fontSize: "20px" }}
        component={"span"}
      >
        Log In
      </Typography>
    </Typography>
  );
};

export default HaveAnAccountText;
