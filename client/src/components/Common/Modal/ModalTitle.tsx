import { ChildrenProps } from "@Types/index";
import { Typography } from "@mui/material";

const ModalTitle = ({ children }: ChildrenProps) => {
  return (
    <Typography
      sx={{
        fontSize: "25px",
        textDecoration: "underline",
        display: "flex",
        justifyContent: "center",
        fontWeight: "bold",
      }}
    >
      {children}
    </Typography>
  );
};

export default ModalTitle;
