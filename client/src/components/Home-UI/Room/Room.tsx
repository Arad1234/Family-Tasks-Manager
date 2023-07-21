import { Box, Typography } from "@mui/material";
import JoinButton from "./JoinButton";
import DeleteButton from "./DeleteButton";
import { IRoom } from "../../../types/index";
import { extractUserIdLocalStorage } from "../../../utils/extractLocalStorage";

interface Props {
  room: IRoom;
}
const Room = ({ room }: Props) => {
  const userId = extractUserIdLocalStorage();
  return (
    <Box
      sx={{
        border: "1px solid gray",
        borderRadius: "10px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Typography variant="h4">{room.roomName}</Typography>
      <Typography sx={{ fontSize: "20px" }}>
        Members: {room.familyMembers.length}/{room.maxMembers}
      </Typography>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <JoinButton roomId={room._id} />
        {userId === room.userId && <DeleteButton roomId={room._id} />}
      </Box>
    </Box>
  );
};

export default Room;
