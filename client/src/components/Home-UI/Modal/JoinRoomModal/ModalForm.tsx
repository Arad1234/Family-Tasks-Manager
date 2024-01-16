import ModalInput from '../../../Common/Modal/ModalInput';
import ModalFormWrapper from '../../../Common/Modal/ModalFormWrapper';
import ModalButton from '../../../Common/Modal/ModalButton';
import { ObjectSchema } from 'yup';
import useCustomFormik from '@Hooks/useCustomFormik';

interface Props {
	formInitialValues: { roomPassword: string };
	formHandleSubmit: (values: { roomPassword: string }) => void;
	formValidationSchema: ObjectSchema<{ roomPassword: string }>;
}

const ModalForm = ({ formHandleSubmit, formInitialValues, formValidationSchema }: Props) => {
	const formik = useCustomFormik<{ roomPassword: string }>({
		formHandleSubmit,
		formInitialValues,
		formValidationSchema,
	});

	const { handleBlur, handleSubmit, handleChange, values, errors, touched } = formik;
	return (
		<ModalFormWrapper onSubmit={handleSubmit}>
			<ModalInput
				onBlur={handleBlur}
				onChange={handleChange}
				type='password'
				label='Room Password'
				name='roomPassword'
				placeholder='Enter room password'
				value={values.roomPassword}
				errorMessage={errors.roomPassword}
				touched={touched.roomPassword}
			/>
			<ModalButton>Join</ModalButton>
		</ModalFormWrapper>
	);
};

export default ModalForm;
