import React from "react";
import { Button } from "@mui/material";

interface Props {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  handleOnClick?: () => void;
}

const AuthButton = ({ className, children, type, handleOnClick }: Props) => {
  return (
    <Button
      className={className}
      type={type ? type : "submit"}
      variant="contained"
      onClick={handleOnClick}
    >
      {children}
    </Button>
  );
};

export default AuthButton;
