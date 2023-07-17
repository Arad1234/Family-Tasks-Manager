import { Box, Typography } from "@mui/material";
import { ChildrenProps } from "../../types";

const TitleComponent = ({ children }: ChildrenProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "left", width: "15rem" }}>
      <Typography sx={{ fontSize: "24px", fontWeight: "500" }}>
        {children}
      </Typography>
    </Box>
  );
};

export default TitleComponent;
