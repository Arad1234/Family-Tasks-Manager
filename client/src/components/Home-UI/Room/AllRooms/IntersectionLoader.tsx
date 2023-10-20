import { Box, CircularProgress } from "@mui/material";
import { observerTargetElementStyle } from "../../../../utils/constants/genericConstants";

const IntersectionLoader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <CircularProgress
        sx={{ ...observerTargetElementStyle, color: "white" }}
      />
    </Box>
  );
};

export default IntersectionLoader;
