import { Divider, Typography, TypographyProps } from "@mui/material";
import { ChildrenProps } from "@Types/index";

const BurgerMenuOption = ({
  children,
  ...props
}: ChildrenProps & TypographyProps) => {
  return (
    <>
      <Typography
        {...props}
        sx={{ fontSize: "25px", fontWeight: "500" }}
      >
        {children}
      </Typography>
      <Divider
        sx={{
          width: "270px",
          borderColor: "gray",
        }}
      />
    </>
  );
};

export default BurgerMenuOption;
