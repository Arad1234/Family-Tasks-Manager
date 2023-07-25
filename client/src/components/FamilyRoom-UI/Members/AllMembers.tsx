import { useAppSelector } from "../../../redux/hooks";
import { Box } from "@mui/material";
import Member from "./Member/Member";

const AllMembers = () => {
  const { currentRoom } = useAppSelector((state) => state.roomsReducer);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {currentRoom.familyMembers.map((member) => {
        return (
          <Member
            key={member.userId}
            member={member}
          />
        );
      })}
    </Box>
  );
};

export default AllMembers;
