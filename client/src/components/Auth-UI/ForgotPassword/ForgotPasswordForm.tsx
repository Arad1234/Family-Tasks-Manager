import { StyledFormTitleComponent } from '../Common/FormTitleComponent/FormTitleComponent.styled';
import { StyledInputComponent } from '../Common/InputComponent/InputComponent.styled';
import FormBottomText from '../Common/FormBottomText/FormBottomText';
import { FormikProps } from 'formik';
import { inputLabelPropsStyle } from '@Utils/constants/genericConstants';
import { StyledForm } from '../Common/Form/Form.styled';
import { StyledAuthButton } from '../Common/AuthButton/AuthButton.styled';
import { StyledSendEmailMessage } from './ForgotPassword.styled';

interface Props {
	formik: FormikProps<{ email: string }>;
	sentEmailMessage: string | null;
}

const ForgotPasswordForm = ({ formik, sentEmailMessage }: Props) => {
	const { values, errors, touched, handleSubmit } = formik;

	return (
		<StyledForm onSubmit={handleSubmit}>
			{sentEmailMessage ? (
				<StyledSendEmailMessage>{sentEmailMessage}</StyledSendEmailMessage>
			) : (
				<>
					<StyledFormTitleComponent>Forgot Password</StyledFormTitleComponent>
					<StyledInputComponent
						formik={formik}
						name='email'
						type='email'
						value={values.email}
						label='Email'
						InputLabelProps={inputLabelPropsStyle}
						inputTouched={touched.email}
						inputError={errors.email}
					/>

					<StyledAuthButton>Send</StyledAuthButton>
					<FormBottomText
						navigateTo='/'
						actionText='Go back'
					/>
				</>
			)}
		</StyledForm>
	);
};

export default ForgotPasswordForm;
