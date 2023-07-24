import { useAppSelector } from "../../../redux/hooks";
import { Box, Typography } from "@mui/material";

const Members = () => {
  const { currentRoom } = useAppSelector((state) => state.roomsReducer);
  return (
    <Box>
      {currentRoom.familyMembers.map((member) => {
        return <Typography key={member.userId}>{member.username}</Typography>;
      })}
    </Box>
  );
};

export default Members;
