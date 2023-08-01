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
        border: "1px solid gray",
        color: option === optionValue ? "white" : "black",
        width: "8rem",
        height: "3rem",
        fontSize: "16px",
        textTransform: "none",
        backgroundColor: option === optionValue ? "rgba(20, 60, 150, 0.5)" : "",
        ":hover": {
          backgroundColor: "rgba(20, 60, 150, 0.5)",
        },
        fontWeight: "700",
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonOption;
