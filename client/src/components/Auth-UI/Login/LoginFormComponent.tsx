import { StyledFormTitleComponent } from '../Common/FormTitleComponent/FormTitleComponent.styled';
import { StyledInputComponent } from '../Common/InputComponent/InputComponent.styled';
import './Login.scss';
import { FormikProps } from 'formik';
import { Box } from '@mui/material';
import FormBottomText from '../Common/FormBottomText/FormBottomText';
import { inputLabelPropsStyle } from '@Utils/constants/genericConstants';
import { StyledForm } from '../Common/Form/Form.styled';
import { StyledAuthButton } from '../Common/AuthButton/AuthButton.styled';
import { toast } from 'react-toastify';
import { StyledForgotPasswordText } from './Login.styled';
import { useNavigate } from 'react-router-dom';

interface Props {
	formik: FormikProps<{ email: string; password: string }>;
}

const LoginFormComponent = ({ formik }: Props) => {
	const navigate = useNavigate();
	const { handleSubmit, values, errors, touched } = formik;

	return (
		<StyledForm onSubmit={handleSubmit}>
			<StyledFormTitleComponent>Login</StyledFormTitleComponent>

			<StyledInputComponent
				label='Email'
				InputLabelProps={inputLabelPropsStyle}
				value={values.email}
				formik={formik}
				type='email'
				name='email'
				inputTouched={touched.email}
				inputError={errors.email}
			/>
			<StyledInputComponent
				label='Password'
				InputLabelProps={inputLabelPropsStyle}
				formik={formik}
				value={values.password}
				type='password'
				name='password'
				inputTouched={touched.password}
				inputError={errors.password}
			/>

			<StyledForgotPasswordText onClick={() => navigate('/forgotPassword')}>Forgot Password</StyledForgotPasswordText>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					marginTop: '20px',
					gap: '10px',
					alignItems: 'center',
				}}
			>
				<StyledAuthButton>Login</StyledAuthButton>

				<p className='hr-lines'>or</p>

				<StyledAuthButton
					backgroundColor='#E5E4E2'
					color='black'
					type='button'
					handleOnClick={() => toast.info('need to pass loginWithGoogle function')}
				>
					Login with google
				</StyledAuthButton>

				<FormBottomText
					marginTop='20px'
					navigateTo='/register'
					actionText='Sign Up'
					commonText="Haven't any account?"
				/>
			</Box>
		</StyledForm>
	);
};

export default LoginFormComponent;
