import { StyledFormTitleComponent } from '../Common/FormTitleComponent/FormTitleComponent.styled';
import { StyledInputComponent } from '../Common/InputComponent/InputComponent.styled';
import { FormikProps } from 'formik';
import FormBottomText from '../Common/FormBottomText/FormBottomText';
import { inputLabelPropsStyle } from '@Utils/constants/genericConstants';
import { StyledForm } from '../Common/Form/Form.styled';
import { StyledAuthButton } from '../Common/AuthButton/AuthButton.styled';

interface Props {
	formik: FormikProps<{
		name: string;
		email: string;
		password: string;
		confirmPassword: string;
	}>;
}

const RegisterFormComponent = ({ formik }: Props) => {
	const { values, errors, touched, handleSubmit } = formik;

	return (
		<StyledForm
			className='register-form'
			onSubmit={handleSubmit}
		>
			<StyledFormTitleComponent>Sign Up</StyledFormTitleComponent>

			<StyledInputComponent
				label='Username'
				InputLabelProps={inputLabelPropsStyle}
				formik={formik}
				value={values.name}
				name='name'
				type='text'
				inputTouched={touched.name}
				inputError={errors.name}
			/>

			<StyledInputComponent
				formik={formik}
				value={values.email}
				name='email'
				type='email'
				label='Email'
				InputLabelProps={inputLabelPropsStyle}
				inputTouched={touched.email}
				inputError={errors.email}
			/>

			<StyledInputComponent
				label='Password'
				InputLabelProps={inputLabelPropsStyle}
				formik={formik}
				value={values.password}
				name='password'
				type='password'
				inputTouched={touched.password}
				inputError={errors.password}
			/>

			<StyledInputComponent
				label='Confirm Password'
				InputLabelProps={inputLabelPropsStyle}
				formik={formik}
				value={values.confirmPassword}
				name='confirmPassword'
				type='password'
				inputTouched={touched.confirmPassword}
				inputError={errors.confirmPassword}
			/>
			<StyledAuthButton>Sign Up</StyledAuthButton>

			<FormBottomText
				actionText='Log In'
				navigateTo='/'
				commonText='Already have an account?'
			/>
		</StyledForm>
	);
};

export default RegisterFormComponent;
