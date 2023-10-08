import { Typography, TypographyProps } from "@mui/material";
import { ChildrenProps } from "../../types";

const BurgerMenuOption = ({
  children,
  ...props
}: ChildrenProps & TypographyProps) => {
  return (
    <Typography
      {...props}
      sx={{ fontSize: "23px" }}
    >
      {children}
    </Typography>
  );
};

export default BurgerMenuOption;
