import { useNavigate } from 'react-router-dom';
import { StyledActionText, StyledBottomText } from './FormBottomText.styled';

interface Props {
	navigateTo: string;
	commonText?: string;
	actionText: string;
	marginTop?: string;
}

const FormBottomText = ({ navigateTo, commonText, actionText, marginTop }: Props) => {
	const navigate = useNavigate();

	return (
		<StyledBottomText marginTop={marginTop}>
			{commonText}{' '}
			<StyledActionText
				onClick={() => navigate(navigateTo)}
				component={'span'}
			>
				{actionText}
			</StyledActionText>
		</StyledBottomText>
	);
};

export default FormBottomText;
