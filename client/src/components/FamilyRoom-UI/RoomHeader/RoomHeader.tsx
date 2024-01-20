import React, { useState } from 'react';
import RoomsMenuModal from './RoomsMenuModal';
import { getMemberRoomsSocket } from '@Redux/actions/familyRoom-actions';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import RoomName from './RoomName';
import MenuIcon from '../../Common/BurgerMenu/MenuIcon';
import BurgerMenu from '../../Common/BurgerMenu/BurgerMenu';
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { setFamilyRoom } from '../../../redux/slices/FamilyRoom/familyRoom-slice';
import { StyledHeaderComponent } from '@Components/Common/Header/Header.styled';

const RoomHeader = () => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const userId = useAppSelector((state) => state.authReducer.userId);
	const isShowMenu = useAppSelector((state) => state.burgerMenuReducer.isShowMenu);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
		dispatch(getMemberRoomsSocket(userId));
		setAnchorEl(e.currentTarget);
	};

	return (
		<StyledHeaderComponent>
			<IoMdArrowBack
				style={{ position: 'absolute', left: '10px', top: '15px' }}
				size={35}
				onClick={() => {
					navigate('/home');
					dispatch(setFamilyRoom(null));
				}}
			/>

			<RoomName
				anchorEl={anchorEl}
				handleOpenMenu={handleOpenMenu}
			/>

			<MenuIcon />

			{isShowMenu && <BurgerMenu />}

			<RoomsMenuModal
				anchorEl={anchorEl}
				setAnchorEl={setAnchorEl}
			/>
		</StyledHeaderComponent>
	);
};

export default RoomHeader;
