import { Typography } from '@mui/material';
import { StyledDropDownBar } from '../Common/DropDownBar/DropDownBar.styled';

const RegisterTitle = () => {
	return (
		<StyledDropDownBar>
			<Typography
				sx={{
					fontSize: '25px',
					padding: '0 ',
					textAlign: 'center',
					fontWeight: '500',
				}}
			>
				Welcome To The
				<Typography
					sx={{
						display: 'block',
						fontSize: '29px',
						fontWeight: '600',
					}}
					component={'span'}
				>
					Family Tasks Manager
				</Typography>
			</Typography>
		</StyledDropDownBar>
	);
};

export default RegisterTitle;
