import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  roomId: string;
}

const EnterRoomButton = ({ roomId }: Props) => {
  const navigate = useNavigate();

  const handleEnterRoom = () => {
    navigate(`/home/${roomId}`);
  };

  return (
    <Button
      sx={{
        width: "130px",
        borderRadius: "6px",
        background: "rgba(50, 200, 50, 0.7)",
        color: "whitesmoke",
        height: "40px",
        textTransform: "none",
        fontSize: "16px",
        ":hover": { background: "rgba(50, 200, 50, 0.5)" },
      }}
      onClick={handleEnterRoom}
      variant="contained"
    >
      Enter Room!
    </Button>
  );
};

export default EnterRoomButton;
