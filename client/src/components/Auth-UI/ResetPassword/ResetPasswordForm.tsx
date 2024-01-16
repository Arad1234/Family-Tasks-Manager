import { FormikProps } from 'formik';
import { StyledInputComponent } from '../Common/InputComponent/InputComponent.styled';
import { StyledFormTitleComponent } from '../Common/FormTitleComponent/FormTitleComponent.styled';
import FormBottomText from '../Common/FormBottomText/FormBottomText';
import { inputLabelPropsStyle } from '@Utils/constants/genericConstants';
import { StyledForm } from '../Common/Form/Form.styled';
import { StyledAuthButton } from '../Common/AuthButton/AuthButton.styled';

interface Props {
	formik: FormikProps<{ newPassword: string; confirmPassword: string }>;
}

const ResetPasswordForm = ({ formik }: Props) => {
	const { values, errors, touched, handleSubmit } = formik;

	return (
		<StyledForm onSubmit={handleSubmit}>
			<StyledFormTitleComponent>Reset Your Pasword</StyledFormTitleComponent>
			<StyledInputComponent
				formik={formik}
				name='newPassword'
				type='password'
				value={values.newPassword}
				label='New Password'
				InputLabelProps={inputLabelPropsStyle}
				inputTouched={touched.newPassword}
				inputError={errors.newPassword}
			/>

			<StyledInputComponent
				formik={formik}
				name='confirmPassword'
				type='password'
				value={values.confirmPassword}
				label='Confirm Password'
				InputLabelProps={inputLabelPropsStyle}
				inputTouched={touched.confirmPassword}
				inputError={errors.confirmPassword}
			/>

			<StyledAuthButton>Create New Password</StyledAuthButton>
			<FormBottomText
				actionText='Go To Login Page'
				navigateTo='/'
			/>
		</StyledForm>
	);
};

export default ResetPasswordForm;
