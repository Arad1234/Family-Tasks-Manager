import { Box } from "@mui/material";
import { ChildrenProps } from "../types";
import variables from "../sass/variables.module.scss";
const BackgroundColor = ({ children }: ChildrenProps) => {
  return (
    <Box
      sx={{
        background: variables.primaryColor,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        overflow: "auto",
      }}
    >
      {children}
    </Box>
  );
};

export default BackgroundColor;
