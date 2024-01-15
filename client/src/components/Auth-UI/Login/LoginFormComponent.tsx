import FormTitleComponent from "../FormTitleComponent/FormTitleComponent";
import InputComponent from "../InputComponent/InputComponent";
import "./Login.scss";
import { FormikProps } from "formik";
import { Box } from "@mui/material";
import FormBottomText from "../FormBottomText/FormBottomText";
import { inputLabelPropsStyle } from "@Utils/constants/genericConstants";
import ForgotPasswordText from "./ForgotPasswordText";
import { FormStyled } from "../styles/form.styled";
import { AuthButtonStyled } from "../AuthButton/AuthButton.styled";
import { toast } from "react-toastify";

interface Props {
  formik: FormikProps<{ email: string; password: string }>;
  loginWithGoogle: () => void;
}

const LoginFormComponent = ({ formik, loginWithGoogle }: Props) => {
  const { handleSubmit, values, errors, touched } = formik;

  return (
    <FormStyled onSubmit={handleSubmit}>
      <FormTitleComponent>Login</FormTitleComponent>

      <InputComponent
        label="Email"
        InputLabelProps={inputLabelPropsStyle}
        value={values.email}
        formik={formik}
        type="email"
        name="email"
        inputTouched={touched.email}
        inputError={errors.email}
      />
      <InputComponent
        label="Password"
        InputLabelProps={inputLabelPropsStyle}
        formik={formik}
        value={values.password}
        type="password"
        name="password"
        inputTouched={touched.password}
        inputError={errors.password}
      />

      <ForgotPasswordText />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "20px",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <AuthButtonStyled>Login</AuthButtonStyled>

        <p className="hr-lines">or</p>

        <AuthButtonStyled
          backgroundColor="#E5E4E2"
          color="black"
          type="button"
          handleOnClick={() =>
            toast.info("need to pass loginWithGoogle function")
          }
        >
          Login with google
        </AuthButtonStyled>

        <FormBottomText
          marginTop="20px"
          navigateTo="/register"
          actionText="Sign Up"
          commonText="Haven't any account?"
        />
      </Box>
    </FormStyled>
  );
};

export default LoginFormComponent;
