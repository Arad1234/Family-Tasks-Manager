import FormTitleComponent from '../FormTitleComponent/FormTitleComponent';
import { StyledInputComponent } from '../InputComponent/InputComponent.styled';
import FormBottomText from '../FormBottomText/FormBottomText';
import { FormikProps } from 'formik';
import SendEmailMessage from './SendEmailMessage';
import { inputLabelPropsStyle } from '@Utils/constants/genericConstants';
import { FormStyled } from '../styles/form.styled';
import { AuthButtonStyled } from '../AuthButton/AuthButton.styled';

interface Props {
	formik: FormikProps<{ email: string }>;
	sentEmailMessage: string | null;
}

const ForgotPasswordForm = ({ formik, sentEmailMessage }: Props) => {
	const { values, errors, touched, handleSubmit } = formik;

	return (
		<FormStyled onSubmit={handleSubmit}>
			{sentEmailMessage ? (
				<SendEmailMessage>{sentEmailMessage}</SendEmailMessage>
			) : (
				<>
					<FormTitleComponent>Forgot Password</FormTitleComponent>
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

					<AuthButtonStyled>Send</AuthButtonStyled>
					<FormBottomText
						navigateTo='/'
						actionText='Go back'
					/>
				</>
			)}
		</FormStyled>
	);
};

export default ForgotPasswordForm;
