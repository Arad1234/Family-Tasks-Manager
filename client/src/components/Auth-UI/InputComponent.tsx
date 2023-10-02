import { Box, TextField, TextFieldProps } from "@mui/material";
import { formikPropsType } from "../../types";
import InputErrorMessage from "./InputErrorMessage";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { useState } from "react";

type Props = {
  formik: formikPropsType;
  inputTouched: boolean | undefined;
  inputError: string | undefined;
} & TextFieldProps;

const InputComponent = ({
  formik,
  inputTouched,
  inputError,
  ...props
}: Props) => {
  const { handleChange, handleBlur } = formik;
  const [hidePassword, setHidePassword] = useState(true);

  let inputIcon = null;
  const iconStyle = { size: 23, style: { margin: "5px" } };

  if (props.name === "name") {
    inputIcon = <BiSolidUser {...iconStyle} />;
  } else if (props.name === "email") {
    inputIcon = <MdEmail {...iconStyle} />;
  } else {
    inputIcon = hidePassword ? (
      <AiFillEye
        {...iconStyle}
        onClick={() => setHidePassword(false)}
      />
    ) : (
      <AiFillEyeInvisible
        {...iconStyle}
        onClick={() => setHidePassword(true)}
      />
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <TextField
        {...props}
        type={
          props.type === "password"
            ? hidePassword
              ? "password"
              : "text"
            : props.type
        }
        onChange={handleChange}
        onBlur={handleBlur}
        variant="standard"
        color="info"
        InputProps={{
          sx: {
            fontSize: "17px",
            width: "15rem",
            borderBottom: "2px solid white",
            color: "white",
          },
          disableUnderline: true,
          endAdornment: inputIcon,
        }}
      />

      {inputError && inputTouched && (
        <InputErrorMessage>{inputError}</InputErrorMessage>
      )}
    </Box>
  );
};

export default InputComponent;
