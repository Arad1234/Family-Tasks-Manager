import { Box, Button } from "@mui/material";
import React from "react";

interface Props {
  handleClick: () => void;
  backgroundColor: string;
  children: React.ReactNode;
}

const GoogleCalendarButton = ({
  handleClick,
  backgroundColor,
  children,
}: Props) => {
  return (
    <Box>
      <Button
        sx={{
          textTransform: "none",
          fontSize: "16px",
          backgroundColor: `rgba(${backgroundColor}, 0.5)`,
          color: "white",
          ":hover": { backgroundColor: `rgba(${backgroundColor}, 0.3)` },
        }}
        variant="outlined"
        onClick={handleClick}
      >
        {children}
      </Button>
    </Box>
  );
};

export default GoogleCalendarButton;
