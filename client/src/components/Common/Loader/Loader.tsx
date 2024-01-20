import { StyledCircularProgress, StyledLoaderContainer } from './Loader.styled';

interface Props {
	height?: string;
}

const Loader = ({ height }: Props) => {
	return (
		<StyledLoaderContainer height={height}>
			<StyledCircularProgress size={70} />
		</StyledLoaderContainer>
	);
};

export default Loader;
