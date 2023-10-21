import { Box } from "@mui/material";
import variables from "@Sass/variables.module.scss";
import { ChildrenProps } from "@Types/index";

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
