import React from "react";
import { Button } from "@mui/material";
import variables from "../../sass/variables.module.scss";

interface Props {
  children: React.ReactNode;
}

const AuthButton = ({ children }: Props) => {
  return (
    <Button
      sx={{
        padding: "13px",
        height: "50px",
        borderRadius: "5px",
        outline: "none",
        backgroundColor: variables.actionColor,
        fontWeight: "600",
        fontSize: "18px",
        width: "62vw",
        textTransform: "none"
      }}
      type="submit"
      variant="contained"
    >
      {children}
    </Button>
  );
};

export default AuthButton;
