import { useAppSelector } from "../../../redux/hooks";
import { Box } from "@mui/material";
import Member from "./Member/Member";
import { IRoom } from "../../../types";

const AllMembers = () => {
  const { currentRoom } = useAppSelector((state) => state.roomsReducer);
  const { familyMembers } = currentRoom as IRoom;
  const isOnlyOneMember = familyMembers.length === 1;

  return (
    <Box
      sx={{
        display: "grid",
        justifyContent: "center",
        gridTemplateColumns: isOnlyOneMember ? null : "repeat(2, 1fr)",
        gridAutoRows: "100px",
        gridGap: "16px",
      }}
    >
      {familyMembers.map((member) => {
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
