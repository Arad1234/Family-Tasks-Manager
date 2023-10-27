import { useNavigate } from "react-router-dom";
import RoomButtonStyled from "./RoomButton/RoomButton.styled";

interface Props {
  roomId: string;
}

const ExploreButton = ({ roomId }: Props) => {
  const navigate = useNavigate();

  const handleEnterRoom = () => {
    navigate(`/home/${roomId}`);
  };

  return (
    <RoomButtonStyled
      handleClick={handleEnterRoom}
      width="120px"
    >
      Explore
    </RoomButtonStyled>
  );
};

export default ExploreButton;
