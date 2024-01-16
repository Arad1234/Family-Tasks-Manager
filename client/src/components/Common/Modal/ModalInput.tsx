import { Box, TextField, TextFieldProps } from '@mui/material';
import ModalInputErrorMessage from './ModalInputErrorMessage';

type Props = {
	errorMessage?: string;
	touched?: boolean;
} & TextFieldProps;

const ModalInput = ({ errorMessage, touched, ...props }: Props) => {
	return (
		<Box sx={{ position: 'relative' }}>
			<TextField
				{...props}
				sx={{ width: '100%' }}
			/>
			{errorMessage && touched && <ModalInputErrorMessage>{errorMessage}</ModalInputErrorMessage>}
		</Box>
	);
};

export default ModalInput;
