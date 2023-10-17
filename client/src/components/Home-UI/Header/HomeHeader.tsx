import BurgerIcon from "../../BurgerMenu/BurgerIcon";
import { useAppSelector } from "../../../redux/hooks";
import BurgerMenu from "../../BurgerMenu/BurgerMenu";
import SearchIcon from "./Search/SearchIcon";
import SearchInput from "./Search/SearchInput";
import { useState } from "react";
import HeaderComponent from "../../Common/Header";

interface Props {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
}

const HomeHeader = ({ setSearchQuery, searchQuery }: Props) => {
  const isShowMenu = useAppSelector(
    (state) => state.burgerMenuReducer.isShowMenu
  );

  const [isShowSearchBar, setIsShowSearchBar] = useState(false);

  return (
    <HeaderComponent>
      <BurgerIcon />

      {isShowMenu && <BurgerMenu />}

      {isShowSearchBar ? (
        <SearchInput
          setIsShowSearchBar={setIsShowSearchBar}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
      ) : (
        <SearchIcon setIsShowSearchBar={setIsShowSearchBar} />
      )}
    </HeaderComponent>
  );
};

export default HomeHeader;
