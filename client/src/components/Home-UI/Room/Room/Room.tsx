import { Box, Typography } from "@mui/material";
import JoinButton from "./JoinButton";
import DeleteButton from "./DeleteButton/DeleteButton";
import { IRoom } from "../../../../types/index";
import ExploreButton from "./ExploreButton";
import RoomName from "./RoomName";
import LeaveButton from "./LeaveButton";
import { useMemo } from "react";
import variables from "../../../../sass/variables.module.scss";
import { useAppSelector } from "../../../../redux/hooks";

interface Props {
  room: IRoom;
}

const Room = ({ room }: Props) => {
  const userId = useAppSelector((state) => state.authReducer.userId);

  const { familyMembers, maxMembers, creator } = room;

  const isRoomCreator = creator.userId === userId;

  const isRoomFull = familyMembers.length === maxMembers;

  const memberId = useMemo(() => {
    return familyMembers.find((memberId) => memberId === userId);
  }, [userId, familyMembers]);

  return (
    <Box
      sx={{
        borderRadius: "10px",
        padding: "10px",
        display: "flex",
        background: variables.secondaryColor,
        flexDirection: "column",
        gap: "10px",
        height: "125px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
        }}
      >
        <RoomName roomName={room.roomName} />
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ fontSize: "20px" }}>
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
        {memberId ? (
          <Box sx={{ display: "flex", gap: "80px" }}>
            <ExploreButton roomId={room._id} />
            {!isRoomCreator && (
              <LeaveButton
                room={room}
                memberId={memberId as string}
              />
            )}
          </Box>
        ) : isRoomFull ? (
          <Typography sx={{ fontWeight: "600", color: "rgb(200, 100, 0)" }}>
            Room Is Full
          </Typography>
        ) : (
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <JoinButton room={room} />
          </Box>
        )}
        {isRoomCreator && <DeleteButton room={room} />}
      </Box>
    </Box>
  );
};

export default Room;
