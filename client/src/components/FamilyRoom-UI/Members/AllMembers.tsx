import { useAppSelector } from "../../../redux/hooks";
import { Box } from "@mui/material";
import Member from "./Member";

const AllMembers = () => {
  const { currentRoom } = useAppSelector((state) => state.roomsReducer);

  return (
    <Box>
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
