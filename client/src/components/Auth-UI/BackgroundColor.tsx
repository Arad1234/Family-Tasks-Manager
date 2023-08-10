import { Box } from "@mui/material";
import { ChildrenProps } from "../../types";

const BackgroundColor = ({ children }: ChildrenProps) => {
  return (
    <Box
      sx={{
        backgroundImage: "linear-gradient(to bottom right, #FDABDD, #374A5A)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "40px",
        height: "100vh",
        width: "100vw",
      }}
    >
      {children}
    </Box>
  );
};

export default BackgroundColor;
