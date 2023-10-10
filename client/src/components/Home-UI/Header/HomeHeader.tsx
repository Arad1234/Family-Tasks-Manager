import { Box } from "@mui/material";
import variables from "../../../sass/variables.module.scss";
import BurgerIcon from "../../BurgerMenu/BurgerIcon";
import { useAppSelector } from "../../../redux/hooks";
import BurgerMenu from "../../BurgerMenu/BurgerMenu";
import SearchIcon from "./SearchIcon";

const HomeHeader = () => {
  const isShowMenu = useAppSelector(
    (state) => state.burgerMenuReducer.isShowMenu
  );

  return (
    <Box
      component={"nav"}
      sx={{
        position: "relative",
        backgroundColor: variables.secondaryColor,
        boxShadow: "3",
        color: "white",
        display: "flex",
        justifyContent: "center",
        height: "65px",
      }}
    >
      <BurgerIcon />

      {isShowMenu && <BurgerMenu />}
      {/* <NewRoomButton /> */}
      <SearchIcon />
    </Box>
  );
};

export default HomeHeader;
