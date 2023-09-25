import { Box } from "@mui/material";
import { ChildrenProps } from "../types";
import variables from "../sass/variables.module.scss";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const BackgroundColor = ({ children }: ChildrenProps) => {
  const location = useLocation();
  const [backgroundColor, setBackgroundColor] = useState(
    variables.primaryColor
  );

  useEffect(() => {
    if (location.pathname.startsWith("/home")) {
      setBackgroundColor(variables.primaryColor);
    } else {
      setBackgroundColor(variables.primaryColor);
    }
  }, [location.pathname]);

  return (
    <Box
      sx={{
        background: backgroundColor,
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
