import { useAppSelector } from "../../../redux/hooks";
import { Box, Typography } from "@mui/material";
import Member from "./Member/Member";
import { IRoom, IUser } from "../../../types";

const AllMembers = () => {
  const familyRoom = useAppSelector(
    (state) => state.familyRoomReducer.familyRoom
  );
  const userId = useAppSelector((state) => state.authReducer.userId);

  const { familyMembers } = familyRoom as IRoom;

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
          const memberAsTypeUser = member as IUser;
          return (
            memberAsTypeUser._id !== userId && (
              <Member
                key={memberAsTypeUser._id}
                member={memberAsTypeUser}
              />
            )
          );
        })
      )}
    </Box>
  );
};

export default AllMembers;
