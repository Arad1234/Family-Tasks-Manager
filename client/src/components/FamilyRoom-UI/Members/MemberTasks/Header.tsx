import { Typography, Box, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setSelectedMember } from "../../../../redux/slices/FamilyRoom/members-slice";

const Header = () => {
  const dispatch = useAppDispatch();
  const { selectedMember } = useAppSelector((state) => state.membersReducer);

  const handleGoBack = () => {
    dispatch(setSelectedMember(null));
  };
  return (
    <Box
      sx={{
        display: "flex",
        marginBottom: "10px",
        justifyContent: "space-around",
      }}
    >
      <Typography sx={{ fontSize: "25px" }}>
        {selectedMember?.username} tasks
      </Typography>
      <Button
        variant="outlined"
        sx={{
          textTransform: "none",
          fontSize: "16px",
          background: "rgba(100, 150, 70, 0.8)",
          fontWeight: "600",
          color: "white",
          ":hover": { background: "rgba(100, 150, 70, 0.6)" },
        }}
        onClick={handleGoBack}
      >
        Members
      </Button>
    </Box>
  );
};

export default Header;
