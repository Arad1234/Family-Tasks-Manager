import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../../redux/hooks";

const WelcomeTitle = () => {
  const username = useAppSelector((state) => state.authReducer.username);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "10px",
        color: "white",
      }}
    >
      <Typography sx={{ fontSize: "28px", fontWeight: "500" }}>
        Hello,
        <Typography
          sx={{ fontSize: "28px", fontWeight: "600" }}
          component="span"
          m={1}
        >
          {username}!
        </Typography>
      </Typography>
    </Box>
  );
};

export default WelcomeTitle;
