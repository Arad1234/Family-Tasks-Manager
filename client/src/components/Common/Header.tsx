import { Box } from "@mui/material";
import { ChildrenProps } from "../../types";
import variables from "../../sass/variables.module.scss";

const HeaderComponent = ({ children }: ChildrenProps) => {
  return (
    <Box
      component={"nav"}
      sx={{
        position: "relative",
        backgroundColor: variables.secondaryColor,
        boxShadow: "3",
        color: "white",
        display: "flex",
        justifyContent: "center",
        minHeight: "65px",
      }}
    >
      {children}
    </Box>
  );
};

export default HeaderComponent;
