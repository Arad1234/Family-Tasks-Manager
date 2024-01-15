import BurgerIcon from "../../Common/BurgerMenu/MenuIcon";
import BurgerMenu from "../../Common/BurgerMenu/BurgerMenu";
import { useAppSelector } from "@Redux/hooks";
import HeaderComponentStyled from "@Components/Common/Header/Header.styled";

const HomeHeader = () => {
  const isShowMenu = useAppSelector(
    (state) => state.burgerMenuReducer.isShowMenu
  );

  return (
    <HeaderComponentStyled>
      <BurgerIcon />

      {isShowMenu && <BurgerMenu />}
    </HeaderComponentStyled>
  );
};

export default HomeHeader;
