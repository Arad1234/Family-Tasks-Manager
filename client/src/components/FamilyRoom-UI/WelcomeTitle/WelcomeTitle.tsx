import { Box, Typography } from "@mui/material";
import { extractUserFromLocalStorage } from "../../../utils/helpers/LocalStorage/extractUser";

const WelcomeTitle = () => {
  const { parsedUsername: currentUsername } = extractUserFromLocalStorage();

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
          {currentUsername}!
        </Typography>
      </Typography>
    </Box>
  );
};

export default WelcomeTitle;
