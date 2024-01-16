import { Box } from '@mui/material';

interface Props {
	children: React.ReactNode;
	className?: string; // Getting the className from styled component.
	height?: string;
	gap?: string;
}

const FormWrapper = ({ children, height, gap, className }: Props) => {
	return (
		<Box
			height={height}
			gap={gap}
			className={className}
		>
			{children}
		</Box>
	);
};

export default FormWrapper;
