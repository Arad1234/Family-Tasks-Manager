import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IRoom } from "../../../../types";

interface Props {
  room: IRoom;
}

const EnterRoomButton = ({ room }: Props) => {
  const navigate = useNavigate();

  const handleEnterRoom = () => {
    navigate(`/home/${room._id}`);
  };

  return (
    <Button
      sx={{
        width: "137px",
        borderRadius: "25px",
        color: "whitesmoke",
        height: "40px",
      }}
      onClick={handleEnterRoom}
      variant="contained"
    >
      Enter Room
    </Button>
  );
};

export default EnterRoomButton;
