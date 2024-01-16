import { StyledDropDownBar } from '../Common/DropDownBar/DropDownBar.styled';
import { StyledForgotPasswordTitle } from './ForgotPassword.styled';

const ForgotPasswordTitle = () => {
	return (
		<StyledDropDownBar>
			<StyledForgotPasswordTitle>Please enter your email to reset your password</StyledForgotPasswordTitle>
		</StyledDropDownBar>
	);
};

export default ForgotPasswordTitle;
