import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { IRoom } from "../../types";
import WelcomeTitle from "../../components/FamilyRoom-UI/WelcomeTitle/WelcomeTitle";

const FamilyRoom = () => {
  const { state } = useLocation();

  const currentRoom: IRoom = state.currentRoom;
  console.log(currentRoom);

  return (
    <Box>
      <WelcomeTitle />
    </Box>
  );
};

export default FamilyRoom;
