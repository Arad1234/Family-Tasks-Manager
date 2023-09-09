import { useNavigate } from "react-router-dom";
import RoomButton from "./Common/RoomButton";

interface Props {
  roomId: string;
}

const EnterRoomButton = ({ roomId }: Props) => {
  const navigate = useNavigate();

  const handleEnterRoom = () => {
    navigate(`/home/${roomId}`);
  };

  return (
    <RoomButton
      backgroundColor="20, 150, 150"
      handleClick={handleEnterRoom}
      width="90px"
    >
      Explore
    </RoomButton>
  );
};

export default EnterRoomButton;
