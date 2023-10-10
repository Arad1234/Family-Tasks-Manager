import { Typography, TypographyProps } from "@mui/material";
import { ChildrenProps } from "../../types";

const BurgerMenuOption = ({
  children,
  ...props
}: ChildrenProps & TypographyProps) => {
  return (
    <Typography
      {...props}
      sx={{ fontSize: "30px", fontWeight: "600" }}
    >
      {children}
    </Typography>
  );
};

export default BurgerMenuOption;
