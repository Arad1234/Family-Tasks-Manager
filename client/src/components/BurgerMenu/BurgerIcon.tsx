import { Box, SxProps } from "@mui/material";
import { useMemo } from "react";
import variables from "../../sass/variables.module.scss";
import { MdClear } from "react-icons/md";

interface Props {
  setShowBurgerMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showBurgerMenu: boolean;
}

const BurgerIcon = ({ setShowBurgerMenu, showBurgerMenu }: Props) => {
  const burgerBarStyle: SxProps = useMemo(() => {
    return showBurgerMenu
      ? {
          color: "white",
          zIndex: "2",
          position: "absolute",
          right: "2px",
          top: "10px",
        }
      : {
          width: "2.2em",
          height: "0.3em",
          borderRadius: "0.5em",
          backgroundColor: "white",
          color: variables.actionColor,
        };
  }, [showBurgerMenu]);

  return showBurgerMenu ? (
    <MdClear
      style={burgerBarStyle}
      onClick={() => setShowBurgerMenu(false)}
      size="50"
    />
  ) : (
    <Box
      onClick={() => setShowBurgerMenu(true)}
      sx={{
        position: "absolute",
        height: "auto",
        width: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "7px",
        right: "10px",
        top: "19px",
      }}
    >
      <Box sx={burgerBarStyle}></Box>
      <Box sx={burgerBarStyle}></Box>
      <Box sx={burgerBarStyle}></Box>
    </Box>
  );
};

export default BurgerIcon;
