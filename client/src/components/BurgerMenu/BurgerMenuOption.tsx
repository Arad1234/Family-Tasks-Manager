import { Typography } from "@mui/material";
import { ChildrenProps } from "../../types";

const BurgerMenuOption = ({
  children,
  onClick,
}: ChildrenProps & { onClick: () => void }) => {
  return (
    <Typography
      onClick={onClick}
      sx={{ fontSize: "23px" }}
    >
      {children}
    </Typography>
  );
};

export default BurgerMenuOption;
