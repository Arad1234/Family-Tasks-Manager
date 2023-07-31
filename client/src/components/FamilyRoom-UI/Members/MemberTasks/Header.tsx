import { Typography, Box, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setSelectedMember } from "../../../../redux/slices/FamilyRoom/members-slice";

const Header = () => {
  const dispatch = useAppDispatch();
  const { selectedMember } = useAppSelector((state) => state.membersReducer);

  return (
    <Box
      sx={{
        display: "flex",
        marginBottom: "10px",
        justifyContent: "space-between",
      }}
    >
      <Typography
        sx={{
          fontSize: "25px",
        }}
      >
        {selectedMember?.username} tasks
      </Typography>
      <Button onClick={() => dispatch(setSelectedMember(null))}>Go Back</Button>
    </Box>
  );
};

export default Header;
