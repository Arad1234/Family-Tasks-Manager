import styled from 'styled-components';
import { Typography } from '@mui/material';

export const StyledForgotPasswordText = styled(Typography)`
	color: ${(props) => props.theme.secondActionColor};
	position: fixed;
	top: 25.3rem;
	right: 58px;
`;
