import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useAppDispatch } from '@Redux/hooks';
import { registerThunk } from '@Redux/thunk/Auth/auth-actions';
import RegisterTitle from '@Components/Auth-UI/Register/RegisterTitle';
import RegisterFormComponent from '@Components/Auth-UI/Register/RegisterFormComponent';
import { StyledFormWrapper } from '@Components/Auth-UI/Common/FormWrapper/FormWrapper.styled';

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const formik = useFormik({
		initialValues: { name: '', email: '', password: '', confirmPassword: '' },
		validationSchema: object({
			name: string().required('Required Field').trim(),
			email: string().email().required('Required Field').trim(),
			password: string().required('Required Field'),
			confirmPassword: string().required('Required Field'),
		}),
		async onSubmit({ name, email, password, confirmPassword }) {
			const response: any = await dispatch(registerThunk({ username: name, email, password, confirmPassword }));

			if (response.error) {
				return toast.error(response.payload);
			}

			toast.success('Created User Successfully!');
			navigate('/');
		},
	});

	return (
		<StyledFormWrapper
			height='auto'
			gap='50px'
		>
			<RegisterTitle />
			<RegisterFormComponent formik={formik} />
		</StyledFormWrapper>
	);
};

export default Register;
