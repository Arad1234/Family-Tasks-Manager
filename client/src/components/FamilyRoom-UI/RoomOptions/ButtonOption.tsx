import { Button } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../redux/hooks";

interface Props {
  handleClick: () => void;
  optionValue: string;
  children: React.ReactNode;
}

const ButtonOption = ({ handleClick, optionValue, children }: Props) => {
  const { option } = useAppSelector((state) => state.roomOptionsReducer);

  return (
    <Button
      onClick={handleClick}
      variant="outlined"
      sx={{
        borderRadius: "20px",
        width: "7rem",
        height: "3.5rem",
        backgroundColor: option === optionValue ? "#ffffcc" : "",
        ":hover": {
          backgroundColor: "#ffffcc",
        },
        fontWeight: "700",
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonOption;
