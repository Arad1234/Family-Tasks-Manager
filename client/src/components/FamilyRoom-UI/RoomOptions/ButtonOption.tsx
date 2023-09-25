import { Button } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import variables from "../../../sass/variables.module.scss";

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
        border: option !== optionValue ? "1px solid white" : "",
        color: "white",
        width: "8rem",
        height: "3rem",
        fontSize: "16px",
        textTransform: "none",
        backgroundColor: option === optionValue ? variables.actionColor : "",
        ":hover": {
          backgroundColor: option === optionValue ? variables.actionColor : "",
        },
        fontWeight: "700",
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonOption;
