import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SecondaryAuthButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      sx={{
        padding: "13px",
        height: "50px",
        borderRadius: "5px",
        outline: "none",
        backgroundColor: "#E5E4E2",
        fontWeight: "600",
        fontSize: "18px",
        width: "62vw",
        textTransform: "none",
        color: "black",
        ":hover": { backgroundColor: "#E5E4E2" },
      }}
      onClick={() => navigate("/register")}
    >
      Sign Up
    </Button>
  );
};

export default SecondaryAuthButton;
