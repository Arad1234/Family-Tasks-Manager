import { useNavigate } from "react-router-dom";
import RoomButtonStyled from "./RoomButton/RoomButton.styled";
import { Box } from "@mui/material";

interface Props {
  roomId: string;
}

const ExploreButton = ({ roomId }: Props) => {
  const navigate = useNavigate();

  const handleEnterRoom = () => {
    navigate(`/home/${roomId}`);
  };

  return (
    <Box sx={{ display: "flex", gap: "80px" }}>
      <RoomButtonStyled
        handleClick={handleEnterRoom}
        width="150px"
      >
        Explore
      </RoomButtonStyled>
    </Box>
  );
};

export default ExploreButton;
