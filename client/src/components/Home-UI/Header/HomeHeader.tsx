import BurgerIcon from "../../BurgerMenu/BurgerIcon";
import BurgerMenu from "../../BurgerMenu/BurgerMenu";
import SearchIcon from "./Search/SearchIcon";
import SearchInput from "./Search/SearchInput";
import { useState } from "react";
import HeaderComponent from "../../Common/Header";
import { useAppSelector } from "@Redux/hooks";

const HomeHeader = () => {
  const isShowMenu = useAppSelector(
    (state) => state.burgerMenuReducer.isShowMenu
  );

  const [isShowSearchBar, setIsShowSearchBar] = useState(false);

  return (
    <HeaderComponent>
      <BurgerIcon />

      {isShowMenu && <BurgerMenu />}

      {isShowSearchBar ? (
        <SearchInput setIsShowSearchBar={setIsShowSearchBar} />
      ) : (
        <SearchIcon setIsShowSearchBar={setIsShowSearchBar} />
      )}
    </HeaderComponent>
  );
};

export default HomeHeader;
