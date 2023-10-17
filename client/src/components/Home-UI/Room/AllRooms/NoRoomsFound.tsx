import { Box, Typography } from "@mui/material";

const NoRoomsFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        color: "white",
        justifyContent: "center",
        alignItems: "center",
        height: "88vh",
      }}
    >
      <Typography variant="h4">No Rooms Found</Typography>
    </Box>
  );
};

export default NoRoomsFound;
