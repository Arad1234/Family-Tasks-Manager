import { Typography } from '@mui/material';
import styled from 'styled-components';

export const StyledBottomText = styled(Typography)<{ marginTopProps: string }>`
	margin-top: ${(props) => props.marginTopProps};
	font-weight: 600;
`;

export const StyledActionText = styled(Typography)`
	color: ${(props) => props.theme.secondActionColor};
	font-size: 18px;
	font-weight: 600;
`;
