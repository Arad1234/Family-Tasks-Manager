import { Box, SxProps } from "@mui/material";
import { useMemo } from "react";
import variables from "@Sass/variables.module.scss";
import { MdClear } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setHideMenu,
  setOpenMenu,
} from "../../redux/slices/BurgerMenu/burgerMenu-slice";

const BurgerIcon = () => {
  const { isShowMenu } = useAppSelector((state) => state.burgerMenuReducer);
  const dispatch = useAppDispatch();

  const burgerBarStyle: SxProps = useMemo(() => {
    return isShowMenu
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
  }, [isShowMenu]);

  return isShowMenu ? (
    <MdClear
      style={burgerBarStyle}
      onClick={() => dispatch(setHideMenu())}
      size="50"
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
