import React from "react";
import { Button } from "@mui/material";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: string;
}

const AuthButton = ({ className, children }: Props) => {
  return (
    <Button
      className={className}
      type="submit"
      variant="contained"
    >
      {children}
    </Button>
  );
};

export default AuthButton;
