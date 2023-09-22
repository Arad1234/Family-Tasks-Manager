import TitleComponent from "../TitleComponent";
import InputLabelWrapper from "../InputLabelWrapper";
import LabelComponent from "../LabelComponent";
import InputErrorMessage from "../InputErrorMessage";
import InputComponent from "../InputComponent";
import "./Login.scss";
import AuthButton from "../AuthButton";
import { FormikProps } from "formik";
import SecondaryAuthButton from "./SecondaryAuthButton";
import { Box } from "@mui/material";
import FormBottomText from "../FormBottomText";

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
      <TitleComponent>Login</TitleComponent>
      <InputLabelWrapper>
        <LabelComponent>Email</LabelComponent>
        <InputComponent
          value={values.email}
          formik={formik}
          type="email"
          name="email"
        />
        {errors.email && touched.email && (
          <InputErrorMessage>{errors.email}</InputErrorMessage>
        )}
      </InputLabelWrapper>
      <InputLabelWrapper>
        <LabelComponent>Password</LabelComponent>
        <InputComponent
          formik={formik}
          value={values.password}
          type="password"
          name="password"
        />
        {errors.password && touched.password && (
          <InputErrorMessage>{errors.password}</InputErrorMessage>
        )}
      </InputLabelWrapper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <AuthButton>Login</AuthButton>

        <p className="hr-lines">or</p>

        <SecondaryAuthButton />

        <FormBottomText
          marginTop="20px"
          navigateTo="/forgotPassword"
          actionText="Click here"
          whiteText="Forgot your password?"
        />
      </Box>
    </form>
  );
};

export default LoginFormComponent;
