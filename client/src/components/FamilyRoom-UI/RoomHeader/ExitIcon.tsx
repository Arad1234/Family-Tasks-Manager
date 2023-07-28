import { Box } from "@mui/material";
import { ImExit } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const ExitIcon = () => {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate("/home")}
      sx={{
        position: "absolute",
        left: "7px",
        top: "7px",
        width: "50px",
        height: "70px",
      }}
    >
      <ImExit
        style={{ transform: "rotate(180deg)" }}
        size={30}
      />
    </Box>
  );
};

export default ExitIcon;
