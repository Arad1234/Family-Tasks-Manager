import { useNavigate } from "react-router-dom";
import RoomButton from "./Common/RoomButton";
import variables from "../../../../sass/variables.module.scss";
interface Props {
  roomId: string;
}

const ExploreButton = ({ roomId }: Props) => {
  const navigate = useNavigate();

  const handleEnterRoom = () => {
    navigate(`/home/${roomId}`);
  };

  return (
    <RoomButton
      backgroundColor={variables.actionColor}
      handleClick={handleEnterRoom}
      width="120px"
    >
      Explore
    </RoomButton>
  );
};

export default ExploreButton;
