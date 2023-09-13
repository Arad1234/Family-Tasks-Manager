import { Box } from "@mui/material";
import { ChildrenProps } from "../../types";

const BackgroundColor = ({ children }: ChildrenProps) => {
  return (
    <Box
      sx={{
        background: "#E5E4E2",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      {children}
    </Box>
  );
};

export default BackgroundColor;
