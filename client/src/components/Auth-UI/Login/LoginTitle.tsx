import { Typography } from '@mui/material';
import { StyledDropDownBar } from '../Common/DropDownBar/DropDownBar.styled';

const LoginTitle = () => {
	return (
		<StyledDropDownBar>
			<Typography sx={{ fontSize: '25px', textAlign: 'center' }}>
				Welcome back!
				<Typography
					sx={{
						fontSize: '30px',
						fontWeight: '600',
						display: 'block',
					}}
					component={'span'}
				>
					Let's Sign you in
				</Typography>
			</Typography>
		</StyledDropDownBar>
	);
};

export default LoginTitle;
