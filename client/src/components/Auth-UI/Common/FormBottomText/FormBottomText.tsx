import { Typography } from '@mui/material';
import variables from '@Sass/variables.module.scss';
import { useNavigate } from 'react-router-dom';

interface Props {
	navigateTo: string;
	commonText?: string;
	actionText: string;
	marginTop?: string;
}

const FormBottomText = ({ navigateTo, commonText, actionText, marginTop }: Props) => {
	const navigate = useNavigate();

	return (
		<Typography sx={{ marginTop, fontWeight: '600' }}>
			{commonText}{' '}
			<Typography
				onClick={() => navigate(navigateTo)}
				component={'span'}
				sx={{
					color: variables.secondActionColor,
					fontSize: '18px',
					fontWeight: '600',
				}}
			>
				{actionText}
			</Typography>
		</Typography>
	);
};

export default FormBottomText;
