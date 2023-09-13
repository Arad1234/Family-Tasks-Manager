import { Box } from "@mui/material";
import { ChildrenProps } from "../../types";

const InputLabelWrapper = ({ children }: ChildrenProps) => {
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

export default InputLabelWrapper;
