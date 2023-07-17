import { Box } from "@mui/material";
import { ChildrenProps } from "../../../../types";

const ModalBox = ({ children }: ChildrenProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "70vw",
        bgcolor: "background.paper",
        border: "1px solid #000",
        borderRadius: "20px",
        boxShadow: 24,
        p: 4,
        gap: "20px",
      }}
    >
      {children}
    </Box>
  );
};

export default ModalBox;
