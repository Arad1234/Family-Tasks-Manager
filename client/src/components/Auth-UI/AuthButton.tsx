import React from "react";
import { Button } from "@mui/material";
import variables from "@Sass/variables.module.scss";

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
        marginTop: "10px",
        backgroundColor: variables.actionColor,
        fontWeight: "600",
        fontSize: "18px",
        width: "62vw",
        ":hover": { backgroundColor: variables.actionColor },
        textTransform: "none",
      }}
      type="submit"
      variant="contained"
    >
      {children}
    </Button>
  );
};

export default AuthButton;
