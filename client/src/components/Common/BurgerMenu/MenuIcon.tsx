import { Box, SxProps } from "@mui/material";
import { useMemo } from "react";
import variables from "@Sass/variables.module.scss";
import { MdClear } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  setHideMenu,
  setOpenMenu,
} from "../../../redux/slices/BurgerMenu/burgerMenu-slice";

const MenuIcon = () => {
  const isShowMenu = useAppSelector(
    (state) => state.burgerMenuReducer.isShowMenu
  );
  const dispatch = useAppDispatch();

  const menuIconStyle: SxProps = useMemo(() => {
    return isShowMenu
      ? {
          zIndex: "2",
          position: "absolute",
          right: "8px",
          top: "15px",
        }
      : {
          width: "30px",
          height: "3px",
          borderRadius: "5px",
          backgroundColor: "white",
          color: variables.actionColor,
        };
  }, [isShowMenu]);

  return isShowMenu ? (
    <MdClear
      style={menuIconStyle}
      onClick={() => dispatch(setHideMenu())}
      size="40"
    />
  ) : (
    <Box
      onClick={() => dispatch(setOpenMenu())}
      sx={{
        position: "absolute",
        height: "auto",
        width: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "7px",
        right: "10px",
        top: "22px",
      }}
    >
      <Box sx={menuIconStyle}></Box>
      <Box sx={menuIconStyle}></Box>
      <Box sx={menuIconStyle}></Box>
    </Box>
  );
};

export default MenuIcon;
