import { Button } from "@mui/material";
import React from "react";

interface Props {
  children: React.ReactNode;
  handleClick: () => void;
  buttonWidth: string;
}

const RoomButton = ({ children, handleClick, buttonWidth }: Props) => {
  return (
    <Button
      sx={{ width: buttonWidth, fontSize: "13px" }}
      variant="contained"
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export default RoomButton;
