import { Box, Typography } from "@mui/material";
import JoinButton from "./JoinButton";
import DeleteButton from "./DeleteButton";
import { IRoom } from "../../../types/index";
import { extractUserIdLocalStorage } from "../../../utils/extractLocalStorageData";
import ViewTasksButton from "./ViewTasksButton";
import ShowMembersButton from "./ShowMembersButton";

interface Props {
  room: IRoom;
}
const Room = ({ room }: Props) => {
  const userId = extractUserIdLocalStorage();
  const { userId: roomCreatorId, familyMembers, maxMembers } = room;
  console.log(room.creator);
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
        gap: "10px",
      }}
    >
      <Typography variant="h4">{room.roomName}</Typography>
      <Typography sx={{ fontSize: "20px" }}>
        Members: {familyMembers.length}/{maxMembers}
      </Typography>
      <Box sx={{ display: "flex", gap: "10px" }}>
        {isMember ? (
          <>
            <ViewTasksButton />
            <ShowMembersButton room={room} />
          </>
        ) : isRoomFull ? (
          <Typography sx={{ fontWeight: "600", color: "rgb(200, 100, 0)" }}>
            Room Is Full
          </Typography>
        ) : (
          <JoinButton room={room} />
        )}
        {userId === roomCreatorId && <DeleteButton room={room} />}
      </Box>
    </Box>
  );
};

export default Room;
