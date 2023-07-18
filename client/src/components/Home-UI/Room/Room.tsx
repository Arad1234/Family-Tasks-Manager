import { Box, Typography } from "@mui/material";
import JoinButton from "../Buttons/JoinButton";

const Room = ({ room }) => {
  return (
    <Box key={room._id}>
      <Typography variant="h2">{room.roomName}</Typography>
      <Typography>{room.maxMembers}</Typography>
      <JoinButton />
    </Box>
  );
};

export default Room;
