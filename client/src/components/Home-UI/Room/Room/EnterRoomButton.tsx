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
      backgroundColor="50, 200, 50"
      handleClick={handleEnterRoom}
      width="135px"
    >
      Enter Room!
    </RoomButton>
  );
};

export default EnterRoomButton;
