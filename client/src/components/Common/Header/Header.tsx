import { Box } from '@mui/material';

interface Props {
	children: React.ReactNode;
	className?: string;
}

const HeaderComponent = ({ children, className }: Props) => {
	return (
		<Box
			className={className}
			component={'nav'}
		>
			{children}
		</Box>
	);
};

export default HeaderComponent;
