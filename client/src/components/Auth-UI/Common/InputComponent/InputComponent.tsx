import { Box, TextField, TextFieldProps } from '@mui/material';
import { formikPropsType } from '@Types/index';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BiSolidUser } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
import { useState } from 'react';
import { StyledInputErrorMessage } from '../InputErrorMessage/InputErrorMessage.styled';

type Props = {
	formik: formikPropsType;
	inputTouched?: boolean;
	inputError?: string;
	className?: string;
} & TextFieldProps;

const textFieldInputProps = {
	sx: {
		fontSize: '17px',
		width: '17.5rem',
		borderBottom: '2px solid',
	},
	disableUnderline: true,
};

const iconStyle = { size: 23, style: { margin: '5px' } };

const InputComponent = ({ formik, inputTouched, inputError, className, ...props }: Props) => {
	const { handleChange, handleBlur } = formik;
	const [hidePassword, setHidePassword] = useState(true);

	let inputIcon = null;

	switch (props.name) {
		case 'name':
			inputIcon = <BiSolidUser {...iconStyle} />;
			break;
		case 'email':
			inputIcon = <MdEmail {...iconStyle} />;
			break;
		default:
			inputIcon = hidePassword ? (
				<AiFillEyeInvisible
					{...iconStyle}
					onClick={() => setHidePassword(false)}
				/>
			) : (
				<AiFillEye
					{...iconStyle}
					onClick={() => setHidePassword(true)}
				/>
			);
	}

	return (
		<Box className={className}>
			<TextField
				{...props}
				type={props.type === 'password' ? (hidePassword ? 'password' : 'text') : props.type}
				onChange={handleChange}
				onBlur={handleBlur}
				variant='standard'
				color='info'
				InputProps={{ ...textFieldInputProps, endAdornment: inputIcon }}
			/>

			{inputError && inputTouched && <StyledInputErrorMessage>{inputError}</StyledInputErrorMessage>}
		</Box>
	);
};

export default InputComponent;
