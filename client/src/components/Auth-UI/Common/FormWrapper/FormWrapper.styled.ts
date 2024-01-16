import styled from 'styled-components';
import FormWrapper from './FormWrapper';

export const StyledFormWrapper = styled(FormWrapper)<{
	height: string;
	gap: string;
}>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: ${(props) => (props.height ? props.height : '100vh')};
	gap: ${(props) => (props.gap ? props.gap : 'auto')};
`;
