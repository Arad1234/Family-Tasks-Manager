import styled from 'styled-components';
import variables from '@Sass/variables.module.scss';
import AuthButton from './AuthButton';

export const StyledAuthButton = styled(AuthButton)<{
	backgroundColor?: string;
	color?: string;
}>`
	padding: 13px;
	height: 37px;
	border-radius: 5px;
	outline: none;
	background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : variables.actionColor)};
	font-weight: 600;
	font-size: 15px;
	color: ${(props) => (props.color ? props.color : 'white')};
	width: 17.5rem;
	text-transform: none;

	&:hover {
		background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : variables.actionColor)};
	}
`;
