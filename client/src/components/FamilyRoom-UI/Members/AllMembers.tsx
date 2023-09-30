import { useAppSelector } from "../../../redux/hooks";
import { Box, Typography } from "@mui/material";
import Member from "./Member/Member";
import { IRoom } from "../../../types";
import { extractUserFromLocalStorage } from "../../../utils/helpers/LocalStorage/extractUser";

const AllMembers = () => {
  const { currentRoom } = useAppSelector((state) => state.roomsReducer);
  const { familyMembers } = currentRoom as IRoom;

  const { parsedUserId: currentUserId } = extractUserFromLocalStorage();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {familyMembers.length === 1 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Typography variant="h5">No Additional Members</Typography>
        </Box>
      ) : (
        familyMembers.map((member) => {
          return (
            member.userId !== currentUserId && (
              <Member
                key={member.userId}
                member={member}
              />
            )
          );
        })
      )}
    </Box>
  );
};

export default AllMembers;
