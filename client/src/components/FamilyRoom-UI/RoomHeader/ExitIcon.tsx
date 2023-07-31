import { Box } from "@mui/material";
import { ImExit } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { setSelectedMember } from "../../../redux/slices/FamilyRoom/members-slice";

const ExitIcon = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleExitRoom = () => {
    navigate("/home");
    dispatch(setSelectedMember(null));
  };

  return (
    <Box
      onClick={handleExitRoom}
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
