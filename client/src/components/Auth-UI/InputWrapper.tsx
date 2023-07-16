import { Box } from "@mui/material";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const InputWrapper = ({ children }: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default InputWrapper;
