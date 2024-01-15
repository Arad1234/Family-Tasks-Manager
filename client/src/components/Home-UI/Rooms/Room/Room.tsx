import { Box, Typography } from "@mui/material";
import JoinButton from "./JoinButton";
import { IRoom } from "@Types/index";
import ExploreButton from "./ExploreButton";
import { useMemo } from "react";
import { useAppSelector } from "@Redux/hooks";
import RoomNameStyled from "./RoomName/RoomName.styled";

interface Props {
  room: IRoom;
}

const Room = ({ room }: Props) => {
  const userId = useAppSelector((state) => state.authReducer.userId);
  const { familyMembers, maxMembers } = room;

  const isRoomFull = familyMembers.length === maxMembers;

  const isMember = useMemo(() => {
    return familyMembers.find((member) => member.userId === userId);
  }, [userId, familyMembers]);

  return (
    <Box
      sx={{
        borderRadius: "40px",
        padding: "10px",
        boxShadow: "0px 8px 20px -5px black",
        display: "flex",
        backgroundColor: "rgb(237, 237, 237)",
        flexDirection: "column",
        gap: "10px",
        color: "black",
        height: "125px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <RoomNameStyled roomName={room.roomName} />
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>
            Members: {familyMembers.length}/{maxMembers}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isMember ? (
          <ExploreButton roomId={room._id} />
        ) : isRoomFull ? (
          <Typography sx={{ fontWeight: "600", color: "rgb(200, 100, 0)" }}>
            Room Is Full
          </Typography>
        ) : (
          <JoinButton room={room} />
        )}
      </Box>
    </Box>
  );
};

export default Room;
