import { Box, Button } from "@mui/material";
import React from "react";

interface Props {
  handleClick: () => void;
  background: string;
  children: React.ReactNode;
}

const GoogleCalendarButton = ({ handleClick, background, children }: Props) => {
  return (
    <Box>
      <Button
        sx={{
          textTransform: "none",
          fontSize: "16px",
          background: `rgba(${background}, 0.5)`,
          color: "white",
          ":hover": { background: `rgba(${background}, 0.3)` },
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
