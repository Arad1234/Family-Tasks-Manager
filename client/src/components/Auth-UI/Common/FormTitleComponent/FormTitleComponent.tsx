import { StyledFormTitle } from './FormTitleComponent.styled';
import { Box } from '@mui/material';

interface Props {
	children: React.ReactNode;
	className?: string;
}

const FormTitleComponent = ({ children, className }: Props) => {
	return (
		<Box className={className}>
			<StyledFormTitle>{children}</StyledFormTitle>
		</Box>
	);
};

export default FormTitleComponent;
