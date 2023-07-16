import React from "react";
import { Button } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const AuthButton = ({ children }: Props) => {
  return (
    <Button
      sx={{
        padding: "13px",
        borderRadius: "5px",
        outline: "none",
        border: "1px solid gray",
        fontWeight: "600",
        fontSize: "17px",
        width: "40vw",
      }}
      type="submit"
      variant="contained"
    >
      {children}
    </Button>
  );
};

export default AuthButton;
