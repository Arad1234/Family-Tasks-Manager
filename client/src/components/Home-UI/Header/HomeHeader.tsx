import BurgerIcon from "../../Common/BurgerMenu/BurgerIcon";
import BurgerMenu from "../../Common/BurgerMenu/BurgerMenu";
import SearchIcon from "./Search/SearchIcon";
import SearchInput from "./Search/SearchInput";
import { useState } from "react";
import { useAppSelector } from "@Redux/hooks";
import HeaderComponentStyled from "@Components/Common/Header/Header.styled";

const HomeHeader = () => {
  const isShowMenu = useAppSelector(
    (state) => state.burgerMenuReducer.isShowMenu
  );

  const [isShowSearchBar, setIsShowSearchBar] = useState(false);

  return (
    <HeaderComponentStyled>
      <BurgerIcon />

      {isShowMenu && <BurgerMenu />}

      {isShowSearchBar ? (
        <SearchInput setIsShowSearchBar={setIsShowSearchBar} />
      ) : (
        <SearchIcon setIsShowSearchBar={setIsShowSearchBar} />
      )}
    </HeaderComponentStyled>
  );
};

export default HomeHeader;
