import { Typography, Box, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setMemberForTasks } from "../../../../redux/slices/FamilyRoom/members-slice";

const Header = () => {
  const dispatch = useAppDispatch();
  const memberForTasks = useAppSelector(
    (state) => state.membersReducer.memberForTasks
  );

  const handleGoBack = () => {
    dispatch(setMemberForTasks(null));
  };

  return (
    <Box
      sx={{
        display: "flex",
        marginBottom: "1rem",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Typography
        sx={{
          paddingTop: "20px",
          fontSize: "22px",
          fontWeight: "600",
          textDecoration: "underline",
        }}
      >
        {memberForTasks?.username}
      </Typography>

      <Button
        variant="outlined"
        sx={{
          position: "absolute",
          left: "-8px",
          top: "-17px",
          height: "2.5em",
          textTransform: "none",
          fontSize: "16px",
          background: "rgba(100, 150, 70, 0.8)",
          fontWeight: "600",
          color: "white",
          ":hover": { background: "rgba(100, 150, 70, 0.6)" },
        }}
        onClick={handleGoBack}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default Header;
