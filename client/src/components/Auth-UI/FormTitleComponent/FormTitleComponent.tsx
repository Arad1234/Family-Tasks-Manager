import { Box } from "@mui/material";
import { ChildrenProps } from "@Types/index";
import { FormTitleStyled } from "./FormTitle.styled";

const FormTitleComponent = ({ children }: ChildrenProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "left", width: "17.5rem" }}>
      <FormTitleStyled>{children}</FormTitleStyled>
    </Box>
  );
};

export default FormTitleComponent;
