import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IRoom } from "../../../../types";
import { useAppSelector } from "../../../../redux/hooks";

interface Props {
  room: IRoom;
}

const EnterRoomButton = ({ room }: Props) => {
  const navigate = useNavigate();
  const { rooms } = useAppSelector((state) => state.roomsReducer);

  const handleEnterRoom = () => {
    navigate(`/home/${room._id}`, { state: { rooms, currentRoom: room } });
  };

  return (
    <Button
      sx={{ width: "137px", borderRadius: "25px", color: "whitesmoke" }}
      onClick={handleEnterRoom}
      variant="contained"
    >
      Enter Room
    </Button>
  );
};

export default EnterRoomButton;
