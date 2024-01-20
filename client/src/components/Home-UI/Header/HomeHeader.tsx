import BurgerIcon from '../../Common/BurgerMenu/MenuIcon';
import BurgerMenu from '../../Common/BurgerMenu/BurgerMenu';
import { useAppSelector } from '@Redux/hooks';
import { StyledHeaderComponent } from '@Components/Common/Header/Header.styled';

const HomeHeader = () => {
	const isShowMenu = useAppSelector((state) => state.burgerMenuReducer.isShowMenu);

	return (
		<StyledHeaderComponent>
			<BurgerIcon />

			{isShowMenu && <BurgerMenu />}
		</StyledHeaderComponent>
	);
};

export default HomeHeader;
