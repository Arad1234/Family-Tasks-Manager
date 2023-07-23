import { Button } from "@mui/material";
import React from "react";

interface Props {
  children: React.ReactNode;
  handleClick: () => void;
  buttonWidth: string;
  variant: "contained" | "outlined" | "text";
}

const RoomButton = ({ children, handleClick, buttonWidth, variant }: Props) => {
  return (
    <Button
      sx={{ width: buttonWidth, fontSize: "13px" }}
      variant={variant}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export default RoomButton;
