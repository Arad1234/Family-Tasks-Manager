import { useAppSelector } from "../../../redux/hooks";
import { Box, Typography } from "@mui/material";
import Member from "./Member/Member";
import { IRoom } from "../../../types";
import { extractUserFromLocalStorage } from "../../../utils/helpers/LocalStorage/extractUser";
import InviteMembersButton from "./InviteMembersButton";

const AllMembers = () => {
  const { currentRoom } = useAppSelector((state) => state.roomsReducer);
  const { familyMembers } = currentRoom as IRoom;

  const { parsedUserId: currentUserId } = extractUserFromLocalStorage();

  return (
    <Box
      sx={{
        display: "grid",
        justifyContent: "center",
        gridTemplateColumns: familyMembers.length > 2 ? "repeat(2, 1fr)" : null,
        gridAutoRows: "100px",
        gridRowGap: "28px",
        gridColumnGap: "15px",
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
          {/* <InviteMembersButton /> */}
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
