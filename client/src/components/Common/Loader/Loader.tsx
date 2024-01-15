import CircularProgress from '@mui/material/CircularProgress';
import { StyledLoaderContainer } from './Loader.styled';

interface Props {
	height?: string;
}

const Loader = ({ height }: Props) => {
	return (
		<StyledLoaderContainer height={height}>
			<CircularProgress
				sx={{ color: 'white' }}
				size={70}
			/>
		</StyledLoaderContainer>
	);
};

export default Loader;
