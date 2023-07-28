import { Box, Typography } from "@mui/material";
import JoinButton from "./JoinButton";
import DeleteButton from "./DeleteButton/DeleteButton";
import { IRoom } from "../../../../types/index";
import { extractUserFromLocalStorage } from "../../../../utils/helpers/LocalStorage/extractUser";
import EnterRoomButton from "./EnterRoomButton";
import RoomName from "./RoomName";

interface Props {
  room: IRoom;
}

const Room = ({ room }: Props) => {
  const { parsedUserId: userId } = extractUserFromLocalStorage();

  const { familyMembers, maxMembers, creator } = room;

  const isMember = familyMembers.some((member) => member.userId === userId);

  const isRoomFull = familyMembers.length === maxMembers;

  return (
    <Box
      sx={{
        border: "1px solid gray",
        borderRadius: "10px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        height: "107px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <RoomName roomName={room.roomName} />

        <Box sx={{ display: "flex", gap: "10px" }}>
          <Typography sx={{ fontSize: "20px" }}>
            Members: {familyMembers.length}/{maxMembers}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {isMember ? (
          <EnterRoomButton room={room} />
        ) : isRoomFull ? (
          <Typography sx={{ fontWeight: "600", color: "rgb(200, 100, 0)" }}>
            Room Is Full
          </Typography>
        ) : (
          <JoinButton room={room} />
        )}
        {userId === creator.userId && <DeleteButton room={room} />}
      </Box>
    </Box>
  );
};

export default Room;
