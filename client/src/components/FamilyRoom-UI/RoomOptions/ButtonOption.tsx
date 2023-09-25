import { Button } from "@mui/material";
import React from "react";
import variables from "../../../sass/variables.module.scss";

interface Props {
  handleClick: () => void;
  optionValue: string;
  children: React.ReactNode;
  selectedOption: "tasks" | "members";
}

const ButtonOption = ({
  handleClick,
  optionValue,
  children,
  selectedOption,
}: Props) => {
  return (
    <Button
      onClick={handleClick}
      variant="outlined"
      sx={{
        border: selectedOption !== optionValue ? "1px solid white" : "",
        color: "white",
        width: "8rem",
        height: "3rem",
        fontSize: "16px",
        textTransform: "none",
        backgroundColor:
          selectedOption === optionValue ? variables.actionColor : "",
        ":hover": {
          backgroundColor:
            selectedOption === optionValue ? variables.actionColor : "",
        },
        fontWeight: "700",
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonOption;
