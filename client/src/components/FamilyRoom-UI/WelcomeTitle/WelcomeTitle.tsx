import { Box, Typography } from "@mui/material";
import { extractUserLocalStorage } from "../../../utils/extractLocalStorageData";

const WelcomeTitle = () => {
  const { parsedUsername: currentUsername } = extractUserLocalStorage();
  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
        Hello,
        <Typography
          sx={{ fontSize: "30px", fontWeight: "600" }}
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
