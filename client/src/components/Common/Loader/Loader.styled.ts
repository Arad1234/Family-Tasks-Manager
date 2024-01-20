import { Box, CircularProgress } from '@mui/material';
import styled from 'styled-components';

export const StyledLoaderContainer = styled(Box)<{ height: string }>`
	display: flex;
	justify-content: center;
	align-items: center;
	height: ${(props) => props.height ?? '100vh'};
`;

export const StyledCircularProgress = styled(CircularProgress)`
	color: white;
`;
