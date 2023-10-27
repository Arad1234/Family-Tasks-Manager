import { Box } from "@mui/material";
import { ChildrenProps } from "@Types/index";
import { FormTitleStyled } from "./styles/formTitle.styled";

const FormTitleComponent = ({ children }: ChildrenProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "left", width: "15rem" }}>
      <FormTitleStyled>{children}</FormTitleStyled>
    </Box>
  );
};

export default FormTitleComponent;
