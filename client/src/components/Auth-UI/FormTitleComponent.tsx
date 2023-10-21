import { Box, Typography } from "@mui/material";
import { ChildrenProps } from "@Types/index";

const FormTitleComponent = ({ children }: ChildrenProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "left", width: "15rem" }}>
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: "500",
          color: "white",
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default FormTitleComponent;
