import styled, { keyframes } from 'styled-components';
import DropDownBar from './DropDownBar';
import variables from '@Sass/variables.module.scss';

const dropDownAnimatiom = keyframes`
from {
    height: 0px;
  }
  to {
    height: 110px;
  }`;

export const StyledDropDownBar = styled(DropDownBar)`
	background-color: ${variables.secondaryColor};
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 110px;
	border-radius: 0px 0px 40px 40px;
	animation: ${dropDownAnimatiom} 0.8s;
`;
