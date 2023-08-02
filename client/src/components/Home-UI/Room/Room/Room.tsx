import { Box, Typography } from "@mui/material";
import JoinButton from "./JoinButton";
import DeleteButton from "./DeleteButton/DeleteButton";
import { IRoom } from "../../../../types/index";
import { extractUserFromLocalStorage } from "../../../../utils/helpers/LocalStorage/extractUser";
import EnterRoomButton from "./EnterRoomButton";
import RoomName from "./RoomName";
import LeaveRoomButton from "./LeaveRoomButton";
import { useMemo } from "react";

interface Props {
  room: IRoom;
}

const Room = ({ room }: Props) => {
  const { parsedUserId: userId } = extractUserFromLocalStorage();

  const { familyMembers, maxMembers, creator } = room;

  const isRoomCreator = creator.userId === userId;

  const isRoomFull = familyMembers.length === maxMembers;

  const member = useMemo(() => {
    return familyMembers.find((member) => member.userId === userId);
  }, [userId, familyMembers]);

  return (
    <Box
      sx={{
        borderRadius: "10px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        height: "107px",
        boxShadow: "3px 2px 6px 1px gray",
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
        {member ? (
          <>
            <EnterRoomButton roomId={room._id} />
            {!isRoomCreator && (
              <LeaveRoomButton
                roomId={room._id}
                member={member}
              />
            )}
          </>
        ) : isRoomFull ? (
          <Typography sx={{ fontWeight: "600", color: "rgb(200, 100, 0)" }}>
            Room Is Full
          </Typography>
        ) : (
          <JoinButton room={room} />
        )}
        {isRoomCreator && <DeleteButton room={room} />}
      </Box>
    </Box>
  );
};

export default Room;
