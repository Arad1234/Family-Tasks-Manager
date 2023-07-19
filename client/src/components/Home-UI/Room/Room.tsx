import { Box, Typography } from "@mui/material";
import JoinButton from "./JoinButton";
import { IRoom } from "../../../types/index";

interface Props {
  room: IRoom;
}
const Room = ({ room }: Props) => {
  return (
    <Box sx={{ border: "1px solid gray", padding: "10px" }}>
      <Typography variant="h4">{room.roomName}</Typography>
      <Typography sx={{ fontSize: "20px" }}>
        Members: {room.familyMembers.length}/{room.maxMembers}
      </Typography>
      <JoinButton roomId={room._id} />
    </Box>
  );
};

export default Room;
