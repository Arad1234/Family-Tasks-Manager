import FormTitleComponent from "../FormTitleComponent";
import InputComponent from "../InputComponent";
import "./Login.scss";
import AuthButton from "../AuthButton";
import { FormikProps } from "formik";
import SecondaryAuthButton from "./SecondaryAuthButton";
import { Box } from "@mui/material";
import FormBottomText from "../FormBottomText";
import { inputLabelPropsStyle } from "../../../utils/constants";
import ForgotPasswordText from "./ForgotPasswordText";

interface Props {
  formik: FormikProps<{ email: string; password: string }>;
}

const LoginFormComponent = ({ formik }: Props) => {
  const { handleSubmit, values, errors, touched } = formik;

  return (
    <form
      className="login-form"
      onSubmit={handleSubmit}
    >
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
        <AuthButton>Login</AuthButton>

        <p className="hr-lines">or</p>

        <SecondaryAuthButton />

        <FormBottomText
          marginTop="20px"
          navigateTo="/register"
          actionText="Sign Up"
          whiteText="Haven't any account?"
        />
      </Box>
    </form>
  );
};

export default LoginFormComponent;
